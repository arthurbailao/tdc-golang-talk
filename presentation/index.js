// Import React
import React from 'react';

import Prism from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-go';
import 'prismjs/themes/prism.css';

import {Deck, Impact, Lists, Content, COLORS} from 'dito-spectacle-theme';
import {Appear, Image, Code, Slide as SpectacleSlide} from 'spectacle';
import CodeSlide from 'spectacle-code-slide';

import Cover from './cover';

// Require CSS
require('normalize.css');

const images = {
  whatIsDito1: require('../assets/images/what-is-dito-1.png'),
  whatIsDito2: require('../assets/images/what-is-dito-2.png'),
  whatIsDito3: require('../assets/images/what-is-dito-3.png'),
  whatIsDito4: require('../assets/images/what-is-dito-4.png'),
  webhooksArch1: require('../assets/images/webhooks-arch-1.png'),
  webhooksArch2: require('../assets/images/webhooks-arch-2.png'),
  webhooksArch3: require('../assets/images/webhooks-arch-3.png'),
  webhooksArch4: require('../assets/images/webhooks-arch-4.png'),
  lambda: require('../assets/images/lambda.png'),
  nodeAndGo: require('../assets/images/node-and-go.png'),
  nodeVsGo: require('../assets/images/node-vs-go.png'),
};

const AppearingList = ({items}) => (
  <Lists.Unordered>
    {items.map((item, i) => (
      <Appear key={i}>
        <Lists.Item>{item}</Lists.Item>
      </Appear>
    ))}
  </Lists.Unordered>
);

const ImageSlide = ({src}) => (
  <SpectacleSlide bgColor={COLORS.DARK_900} align="flex-start center">
    <Image src={src} />
  </SpectacleSlide>
);

export default () => (
  <Deck>
    <Cover />
    <Impact
      variant={2}
      text={<>previously on <strong>Dito</strong></>}
      textSuffix="..."
    />
    <ImageSlide src={images.whatIsDito1} />
    <ImageSlide src={images.whatIsDito2} />
    <ImageSlide src={images.whatIsDito3} />
    <ImageSlide src={images.whatIsDito4} />
    <ImageSlide src={images.webhooksArch1} />
    <ImageSlide src={images.webhooksArch2} />
    <ImageSlide src={images.webhooksArch3} />
    <ImageSlide src={images.webhooksArch4} />
    <Content slideTitle="Webhooks Service" slideTitleSuffix=".">
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
      slideTitle="Características do Webhooks Service"
      slideTitleSuffix=".">
      <AppearingList
        items={[
          'Sateless API',
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
          let's go <strong>Serverless</strong>
        </>
      }
      textSuffix="!"
    />
    <ImageSlide src={images.lambda} />
    <ImageSlide src={images.nodeAndGo} />
    <ImageSlide src={images.nodeVsGo} />
    <Content slideTitle="Benchmark" slideTitleSuffix=".">
      <Lists.Unordered>
        <Appear>
          <Lists.Item>
            HTTP POST
            <p>
              <Code>{'{"action": "buy"} // Single'}</Code>
            </p>
            <p>
              <Code>{'[{"action": "buy"},...] // Bulk 700 items'}</Code>
            </p>
          </Lists.Item>
        </Appear>
        <Appear>
          <Lists.Item>Parse de JSON</Lists.Item>
        </Appear>
        <Appear>
          <Lists.Item>
            Adicionar a propriedade <Code>received_at</Code>
          </Lists.Item>
        </Appear>
        <Appear>
          <Lists.Item>
            Enviar para Kinesis: PartitionKey = UUID, chunks de 500
          </Lists.Item>
        </Appear>
      </Lists.Unordered>
    </Content>
    <CodeSlide
      lang="go"
      bgColor={COLORS.WHITE}
      code={require('raw-loader!../assets/main.go')}
      style={{fontSize: '1.5em'}}
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
        {loc: [85, 86]},
        {loc: [85, 86]},
        {loc: [120, 121]},
        {loc: [124, 127]},
      ]}
    />
  </Deck>
);

// const SampleImpactText = () => (
//   <>
//     Os líderes começaram cedo <strong>e hoje lucram alto</strong>
//   </>
// );

// const DitoMission = () => (
//   <>
//     Com <strong>tecnologia</strong>, empoderar o varejo a{' '}
//     <strong>conhecer</strong> e se <strong>relacionar</strong> com consumidores
//     de forma personalizada e escalável para <strong>vender mais</strong>
//   </>
// );
// export default () => (
//   <Deck>
//     <Separator number="1" text="Modelos de Capas" />
//     <Cover
//       variant={1}
//       title="Título da Palestra"
//       subtitle="Nome do Projeto"
//       titleSuffix="."
//     />
//     <Cover
//       variant={2}
//       title="Título da Palestra"
//       subtitle="Nome do Projeto"
//       titleSuffix="."
//     />
//     <Cover
//       variant={3}
//       title="Título da Palestra"
//       subtitle="Nome do Projeto"
//       titleSuffix="."
//     />
//     <Cover
//       variant={4}
//       bgBlur="5px"
//       bgSrc="https://cdn-images-1.medium.com/max/1600/1*RnzDU-OZZSup5PMAcshc4Q.jpeg"
//       title="Título da Palestra"
//       subtitle="Nome do Projeto"
//       titleSuffix="."
//     />
//     <Separator number="2" text="Slide normal" />
//     <Content
//       breadcrumb="Introdução"
//       slideTitle="Título ou frase importante"
//       slideTitleSuffix=".">
//       Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
//       tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
//       veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
//       commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
//       velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
//       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
//       est laborum.
//     </Content>
//     <Content
//       breadcrumb="Introdução"
//       slideTitle="Título ou frase importante"
//       slideTitleSuffix=".">
//       <Lists.Ordered>
//         <Lists.Item>
//           Este é um exemplo de tópico normal. Você pode usá-lo para um momento
//           que precise colocar mais tópicos, mas lembre-se de não colocar muito
//           texto, use apenas para lembretes.
//         </Lists.Item>
//         <Lists.Item>
//           Para mudar a cor da bolinha, é só clicar nela. Você pode usar vermelho
//           para um tópico negativo e amarelo para algo que pode ser melhorado,
//           caso esteja fazendo uma apresentação de resultados.
//         </Lists.Item>
//         <Lists.Item>Exemplo de outro tópico.</Lists.Item>
//       </Lists.Ordered>
//     </Content>
//     <Content
//       breadcrumb="Introdução"
//       slideTitle="Título ou frase importante"
//       slideTitleSuffix=".">
//       <Lists.Unordered>
//         <Lists.Item>
//           Este é um exemplo de tópico normal. Você pode usá-lo para um momento
//           que precise colocar mais tópicos, mas lembre-se de não colocar muito
//           texto, use apenas para lembretes.
//         </Lists.Item>
//         <Lists.Item>
//           Para mudar a cor da bolinha, é só clicar nela. Você pode usar vermelho
//           para um tópico negativo e amarelo para algo que pode ser melhorado,
//           caso esteja fazendo uma apresentação de resultados.
//         </Lists.Item>
//         <Lists.Item>Exemplo de outro tópico.</Lists.Item>
//       </Lists.Unordered>
//     </Content>
//     <Separator number="3" text="Slides de impacto com frases" />
//     <Impact variant={1} textSuffix="." text={<SampleImpactText />} />
//     <Impact variant={2} textSuffix="?" text={<SampleImpactText />} />
//     <Impact variant={3} textSuffix="!" text={<SampleImpactText />} />
//     <Impact
//       variant={4}
//       breadcrumb="Tópico / Missão"
//       slideTitle="Nossa Missão"
//       slideTitleSuffix="."
//       textSuffix="."
//       text={<DitoMission />}
//     />
//   </Deck>
// );
