package main

import (
	"encoding/json"
	"fmt"
	"time"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/kinesis"
	"github.com/google/uuid"
	"github.com/uudashr/iso8601"
)

// Track defines track event structure
type Track struct {
	Action     string       `json:"action"`
	ReceivedAt iso8601.Time `json:"received_at"`
}

// Bulk defines a bulk of track events
type Bulk struct {
	Records    []Track
	ReceivedAt iso8601.Time
}

var routes = map[string]func(events.APIGatewayProxyRequest) (string, error){
	"/track":      TrackHandler,
	"/track/bulk": BulkHandler,
}

func router(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	response, err := routes[request.Path](request)
	if err != nil {
		return SendError(err)
	}

	return SendSuccess(response)
}

func main() {
	lambda.Start(router)
}

// TrackHandler handles incoming request from /track path
func TrackHandler(request events.APIGatewayProxyRequest) (string, error) {
	var event Track
	err := json.Unmarshal([]byte(request.Body), &event)
	if err != nil {
		return "", err
	}
	event.ReceivedAt = iso8601.Time(time.Now())

	data, err := json.Marshal(event)
	if err != nil {
		return "", err
	}

	client := NewClient()
	response, err := TrackEvent(client, data)

	if err != nil {
		return "", err
	}

	return response.String(), nil
}

// BulkHandler handles incoming request from /track/bulk path
func BulkHandler(request events.APIGatewayProxyRequest) (string, error) {
	var bulk Bulk
	err := json.Unmarshal([]byte(request.Body), &bulk)

	if err != nil {
		return "", err
	}

	chunks, err := generateChunks(bulk.Records, 500)
	if err != nil {
		return "", err
	}

	response, err := asyncTrackBulk(chunks)

	if err != nil {
		return "", err
	}
	return response.String(), nil
}

func generateChunks(records []Track, chunkSize int) ([][][]byte, error) {
	var chunks [][][]byte
	var chunk [][]byte

	now := iso8601.Time(time.Now())
	for _, record := range records {
		record.ReceivedAt = now
		data, err := json.Marshal(record)
		if err != nil {
			return nil, err
		}

		if len(chunk) >= chunkSize {
			chunks = append(chunks, chunk)
			chunk = nil
		}

		chunk = append(chunk, data)
	}

	if len(chunk) > 0 {
		chunks = append(chunks, chunk)
	}

	return chunks, nil
}

func asyncTrackBulk(chunks [][][]byte) (kinesis.PutRecordsOutput, error) {
	client := NewClient()
	ch := make(chan PutRecordsMessage)

	for _, chunk := range chunks {
		go TrackBulk(client, chunk, ch)
	}

	var messages []PutRecordsMessage

	for i := 0; i < len(chunks); i++ {
		messages = append(messages, <-ch)
	}

	return mergeResponseMessages(messages)
}

func mergeResponseMessages(messages []PutRecordsMessage) (kinesis.PutRecordsOutput, error) {
	var failedRecordCount int64
	var results []*kinesis.PutRecordsResultEntry

	for _, message := range messages {
		if message.Error != nil {
			return kinesis.PutRecordsOutput{}, message.Error
		}
		failedRecordCount += *message.Response.FailedRecordCount
		results = append(results, message.Response.Records...)
	}

	return kinesis.PutRecordsOutput{
		FailedRecordCount: &failedRecordCount,
		Records:           results,
	}, nil
}

// NewClient creates a Kinesis client
func NewClient() *kinesis.Kinesis {
	s := session.New(&aws.Config{
		Region:      aws.String("us-east-1"),
		Credentials: credentials.NewEnvCredentials(),
	})

	return kinesis.New(s)
}

// TrackEvent sends event to Kinesis stream
func TrackEvent(client *kinesis.Kinesis, data []byte) (*kinesis.PutRecordOutput, error) {
	entry := kinesis.PutRecordInput{
		StreamName:   aws.String("lambda-bm"),
		Data:         data,
		PartitionKey: aws.String(uuid.Must(uuid.NewUUID()).String()),
	}

	return client.PutRecord(&entry)
}

// PutRecordsMessage type
type PutRecordsMessage struct {
	Response *kinesis.PutRecordsOutput
	Error    error
}

// TrackBulk sends bulk to Kinesis stream
func TrackBulk(client *kinesis.Kinesis, chunk [][]byte, ch chan<- PutRecordsMessage) {
	var records []*kinesis.PutRecordsRequestEntry
	for _, data := range chunk {
		entry := kinesis.PutRecordsRequestEntry{}
		entry.SetData(data)
		entry.SetPartitionKey(uuid.Must(uuid.NewUUID()).String())

		records = append(records, &entry)
	}

	input := kinesis.PutRecordsInput{
		Records:    records,
		StreamName: aws.String("lambda-bm"),
	}
	response, error := client.PutRecords(&input)

	ch <- PutRecordsMessage{Response: response, Error: error}
}

// SendError sends error response
func SendError(err error) (events.APIGatewayProxyResponse, error) {
	return events.APIGatewayProxyResponse{
		StatusCode: 400,
		Body:       fmt.Sprintf(`{"error": "%s"}`, err.Error()),
		Headers: map[string]string{
			"Content-Type": "application/json",
		},
	}, nil
}

// SendSuccess sends success response
func SendSuccess(response string) (events.APIGatewayProxyResponse, error) {
	return events.APIGatewayProxyResponse{
		StatusCode: 200,
		Body:       response,
		Headers: map[string]string{
			"Content-Type": "application/json",
		},
	}, nil
}
