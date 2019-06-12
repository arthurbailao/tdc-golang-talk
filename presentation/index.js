// Import React
import React from 'react';

import Prism from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-go';
import 'prismjs/themes/prism.css';

import './styles.css';

import {
  Heading,
  Bar,
  Deck,
  Impact,
  Lists,
  Content,
  COLORS,
} from 'dito-spectacle-theme';

import {
  Appear,
  Image,
  Code,
  Table as SpectacleTable,
  TableHeader,
  TableRow,
  TableHeaderItem,
  TableBody,
  TableItem,
  Slide as SpectacleSlide,
} from 'spectacle';

import CodeSlide from 'spectacle-code-slide';

// Require CSS
require('normalize.css');

const images = {
  gopher: require('../assets/images/gopher.png'),
  whatIsDito1: require('../assets/images/what-is-dito-1.png'),
  whatIsDito2: require('../assets/images/what-is-dito-2.png'),
  whatIsDito3: require('../assets/images/what-is-dito-3.png'),
  whatIsDito4: require('../assets/images/what-is-dito-4.png'),
  webhooksArch1: require('../assets/images/webhooks-arch-1.png'),
  webhooksArch2: require('../assets/images/webhooks-arch-2.png'),
  webhooksArch3: require('../assets/images/webhooks-arch-3.png'),
  webhooksArch4: require('../assets/images/webhooks-arch-4.png'),
  aws: require('../assets/images/aws.png'),
  lambda: require('../assets/images/lambda.png'),
  nodeAndGo: require('../assets/images/node-and-go.png'),
  nodeVsGo: require('../assets/images/node-vs-go.png'),
  bmLoad: require('../assets/images/bm-load.png'),
  bmSingle: require('../assets/images/bm-single.png'),
  bmBulk: require('../assets/images/bm-bulk.png'),
  gopherPunch: require('../assets/images/gopher-punch.gif'),
};

const AppearingList = ({items}) => (
  <Lists.Unordered textSize="2rem" bulletSize="2.6rem">
    {items.map((item, i) => (
      <Appear key={i}>
        <Lists.Item>{item}</Lists.Item>
      </Appear>
    ))}
  </Lists.Unordered>
);

const ImageSlide = ({src, width = 1024, bgColor = COLORS.DARK_900}) => (
  <SpectacleSlide
    bgColor={bgColor}
    align="center center"
    padding={'0 10vw 0 0'}>
    <Image src={src} width={width} style={{margin: 'auto'}} />
  </SpectacleSlide>
);

const Table = ({header, rows}) => (
  <SpectacleTable>
    <TableHeader>
      <TableRow>
        {header.map((item, i) => (
          <TableHeaderItem key={i}>{item}</TableHeaderItem>
        ))}
      </TableRow>
    </TableHeader>
    <TableBody>
      {rows.map((row, i) => (
        <TableRow key={`row:${i}`}>
          {row.map((item, j) => (
            <TableItem key={`item:${j}`}>{item}</TableItem>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </SpectacleTable>
);

const Cover = ({title, titleSuffix}) => (
  <SpectacleSlide bgColor={COLORS.NAVY_700} align="flex-start center">
    <Heading
      size={3}
      fontWeight={700}
      margin="1rem 0 0"
      suffix={titleSuffix}
      textColor={COLORS.WHITE}
      suffixColor={COLORS.GREEN_500}>
      {title}
    </Heading>
    <Bar width="7vw" margin="2vh 0 0" />
    <Image
      src={images.gopher}
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        margin: 'auto',
        bottom: '-10px',
      }}
    />
  </SpectacleSlide>
);

export default () => (
  <Deck>
    <Cover
      variant={2}
      title="Benchmark Go vs Node em arquitetura Serverless"
      style={{padding: '0 10vw 0 0'}}
      titleSuffix="."
    />
    <Impact
      variant={2}
      text={
        <>
          o que é a <strong>Dito</strong>
        </>
      }
      textSuffix="?"
      style={{padding: '0 10vw 0 0'}}
    />
    <ImageSlide src={images.whatIsDito1} />
    <ImageSlide src={images.whatIsDito2} />
    <ImageSlide src={images.whatIsDito3} />
    <ImageSlide src={images.whatIsDito4} />
    <ImageSlide src={images.webhooksArch1} />
    <ImageSlide src={images.webhooksArch2} />
    <ImageSlide src={images.webhooksArch3} />
    <ImageSlide src={images.webhooksArch4} />
    <Content
      breadcrumb="TDC2019 BH"
      slideTitle="Webhooks Service"
      slideTitleSuffix="."
      style={{padding: '0 10vw 0 0'}}>
      <AppearingList
        items={[
          'Receber requests HTTP',
          'Fazer parse JSON',
          'Aplicar transformações',
          'Enviar para Kinesis',
        ]}
      />
    </Content>
    <Content
      breadcrumb="TDC2019 BH"
      slideTitle="Principais características"
      slideTitleSuffix="."
      style={{padding: '0 10vw 0 0'}}>
      <AppearingList
        items={[
          'Stateless API',
          'Picos de requests',
          'Alta disponibilidade',
          'Tempo de resposta não é uma prioridade',
        ]}
      />
    </Content>
    <Impact
      variant={2}
      text={
        <>
          arquitetura <strong>Serverless</strong>
        </>
      }
      textSuffix="!"
      style={{padding: '0 10vw 0 0'}}
    />
    <ImageSlide src={images.aws} width={400} />
    <ImageSlide src={images.lambda} width={300} />
    <ImageSlide src={images.nodeAndGo} />
    <ImageSlide src={images.nodeVsGo} />
    <Content
      breadcrumb="TDC2019 BH"
      slideTitle="Benchmark"
      slideTitleSuffix="."
      style={{padding: '0 10vw 0 0'}}>
      <AppearingList
        items={[
          <>
            HTTP POST{' '}
            <p style={{fontSize: '1.3rem'}}>
              <Code>{'{"action": "buy"} // Single'}</Code>
            </p>
            <p style={{fontSize: '1.3rem'}}>
              <Code>{'[{"action": "buy"},...] // Bulk 700 items'}</Code>
            </p>
          </>,
          'Parse de JSON',
          <>
            Adicionar <Code>received_at</Code>
          </>,
          'Enviar para Kinesis: PartitionKey = UUID, chunks de 500',
        ]}
      />
    </Content>
    <CodeSlide
      lang="go"
      bgColor={COLORS.WHITE}
      code={require('raw-loader!../assets/code/main.go')}
      showLineNumbers={true}
      style={{fontSize: '1.7em', padding: '0 10vw 0 0'}}
      ranges={[
        {loc: [43, 46]},
        {loc: [34, 35]},
        {loc: [34, 42]},
        {loc: [29, 33]},
        {loc: [48, 49]},
        {loc: [49, 51]},
        {loc: [54, 55]},
        {loc: [56, 57]},
        {loc: [62, 63]},
        {loc: [166, 175]},
        {loc: [72, 73]},
        {loc: [73, 75]},
        {loc: [80, 81]},
        {loc: [93, 94]},
        {loc: [99, 100]},
        {loc: [100, 101]},
        {loc: [105, 111]},
        {loc: [85, 86]},
        {loc: [120, 121]},
        {loc: [124, 127]},
      ]}
    />
    <Content
      breadcrumb="TDC2019 BH"
      slideTitle="Experimento"
      slideTitleSuffix="."
      style={{padding: '0 10vw 0 0'}}>
      <AppearingList
        items={[
          'Usamos AWS CodeStar: API Gateway + Lambda',
          'Configurações default: 128mb',
          'Load Test simultâneo de 15 min - Artillery',
        ]}
      />
    </Content>
    <ImageSlide src={images.bmLoad} width={900} />
    <Impact
      variant={2}
      text={
        <>
          quem <strong>ganhou</strong>
        </>
      }
      textSuffix="?"
      style={{padding: '0 10vw 0 0'}}
    />
    <ImageSlide src={images.bmSingle} width={900} />
    <ImageSlide src={images.bmBulk} width={900} />
    <Content
      breadcrumb="TDC2019 BH"
      slideTitle="Tempo de resposta"
      slideTitleSuffix="."
      style={{padding: '0 10vw 0 0'}}>
      <Table
        header={[null, 'Node', 'Go']}
        rows={[['Single', '68 ms', '11 ms'], ['Bulk', '514 ms', '379 ms']]}
      />
    </Content>
    <Content
      breadcrumb="TDC2019 BH"
      slideTitle="Custo 100M de datapoints"
      slideTitleSuffix="."
      style={{padding: '0 10vw 0 0'}}>
      <Table
        header={[null, 'Node', 'Go']}
        rows={[['Single', '$27', '$21'], ['Bulk', '$0,18', '$0,13']]}
      />
    </Content>
    <Impact
      variant={2}
      text={
        <>
          Go é cerca de <strong>30% mais barato</strong>
        </>
      }
      textSuffix="!"
      style={{padding: '0 10vw 0 0'}}
    />
    <Content
      breadcrumb="TDC2019 BH"
      slideTitle="Além disso"
      slideTitleSuffix="..."
      style={{padding: '0 10vw 0 0'}}>
      <AppearingList
        items={[
          'Go é estaticamente tipada e compila muito rápido',
          'Não existem várias formas de fazer as coisas',
          'Tem formatador nativo',
          'Simples de implementar concorrência',
        ]}
      />
    </Content>
    <ImageSlide src={images.gopherPunch} width={900} bgColor={COLORS.WHITE} />
  </Deck>
);
