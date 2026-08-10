import { createRoot } from 'react-dom/client';
import './styles.css';

const models = [
  { id:'transformer', name:'Transformer', date:'2017.06', year:2017, org:'Google Brain', architecture:'Encoder–Decoder', modality:'Text', params:'65M', innovation:'用自注意力取代循环结构，奠定现代大模型的共同语言。', desc:'《Attention Is All You Need》提出完整的 Transformer 架构。它以并行计算、位置编码和多头注意力重写了序列建模范式，是后续语言、视觉和多模态模型的共同起点。', tags:['Self-Attention','Multi-Head'], level:'核心', open:true, china:false, next:['gpt1','bert','vit','t5'] },
  { id:'gpt1', name:'GPT', alias:'GPT-1', date:'2018.06', year:2018, org:'OpenAI', architecture:'Decoder-only', modality:'Text', params:'117M', innovation:'证明“预训练 + 微调”可用单向 Transformer 泛化到多任务。', desc:'GPT 将 Transformer decoder 用于生成式预训练，再以极少任务改动完成下游微调，开启了 Decoder-only 的规模化主线。', tags:['Pre-training','Decoder'], level:'核心', open:false, china:false, next:['gpt2'] },
  { id:'bert', name:'BERT', date:'2018.10', year:2018, org:'Google AI', architecture:'Encoder-only', modality:'Text', params:'340M', innovation:'双向上下文预训练，让语言理解任务出现统一底座。', desc:'BERT 通过掩码语言模型获得双向表征，迅速成为 NLP 理解任务的默认初始化方案，也清晰分出了 Encoder-only 理解路线。', tags:['MLM','Bidirectional'], level:'核心', open:true, china:false, next:['roberta','xlnet'] },
  { id:'gpt2', name:'GPT-2', date:'2019.02', year:2019, org:'OpenAI', architecture:'Decoder-only', modality:'Text', params:'1.5B', innovation:'展示语言模型规模扩大后涌现出的零样本泛化能力。', desc:'GPT-2 将自回归语言模型推向十亿参数量级，展示了无需特定训练样本也能解决任务的早期 in-context 学习迹象。', tags:['Scaling','Zero-shot'], level:'核心', open:true, china:false, next:['gpt3'] },
  { id:'roberta', name:'RoBERTa', date:'2019.07', year:2019, org:'Meta AI', architecture:'Encoder-only', modality:'Text', params:'355M', innovation:'用更充分的训练证明 BERT 仍有显著性能空间。', desc:'RoBERTa 调整训练策略、数据量和动态掩码方式，成为理解模型训练配方的重要基准。', tags:['Dynamic Masking'], level:'重要', open:true, china:false, next:[] },
  { id:'xlnet', name:'XLNet', date:'2019.06', year:2019, org:'CMU / Google', architecture:'Hybrid', modality:'Text', params:'340M', innovation:'以排列语言建模兼顾自回归和双向上下文。', desc:'XLNet 尝试融合生成式与判别式预训练的优点，代表了 BERT 时代对预训练目标的关键探索。', tags:['Permutation LM'], level:'重要', open:true, china:false, next:[] },
  { id:'t5', name:'T5', date:'2019.10', year:2019, org:'Google Research', architecture:'Encoder–Decoder', modality:'Text', params:'11B', innovation:'把所有 NLP 任务统一为 text-to-text。', desc:'T5 用同一种输入输出形式覆盖翻译、摘要、问答等任务，成为 Encoder–Decoder 路线最具代表性的规模化模型。', tags:['Text-to-Text'], level:'核心', open:true, china:false, next:['switch'] },
  { id:'gpt3', name:'GPT-3', date:'2020.05', year:2020, org:'OpenAI', architecture:'Decoder-only', modality:'Text', params:'175B', innovation:'175B 参数使 few-shot learning 成为大模型范式的中心。', desc:'GPT-3 展示了规模律和上下文示例带来的能力跃迁，奠定后续通用语言模型产品化、对齐和 Agent 发展的底座。', tags:['In-context','Scaling Laws'], level:'核心', open:false, china:false, next:['instruct','gpt4','llama'] },
  { id:'vit', name:'Vision Transformer', alias:'ViT', date:'2020.10', year:2020, org:'Google Research', architecture:'Encoder-only', modality:'Vision', params:'307M', innovation:'将图像切成 patch 后交给 Transformer，打开视觉分支。', desc:'ViT 证明大规模预训练下纯 Transformer 能在视觉任务上胜过卷积网络，成为多模态视觉编码器的基础节点。', tags:['Patch','Vision'], level:'核心', open:true, china:false, next:['clip','llava'] },
  { id:'clip', name:'CLIP', date:'2021.01', year:2021, org:'OpenAI', architecture:'Hybrid', modality:'Multimodal', params:'428M', innovation:'用图文对比学习建立可迁移的视觉语言表示。', desc:'CLIP 在海量自然语言监督下学习图像与文本的共同空间，为零样本分类、图文检索和 VLM 提供关键接口。', tags:['Contrastive','Vision-Language'], level:'核心', open:true, china:false, next:['flamingo','llava'] },
  { id:'switch', name:'Switch Transformer', date:'2021.01', year:2021, org:'Google Research', architecture:'MoE', modality:'Text', params:'1.6T total', innovation:'以稀疏 MoE 扩大总参数量并控制计算成本。', desc:'Switch Transformer 将路由到单专家的策略规模化，确立了今天高效大模型中 Mixture-of-Experts 的重要路线。', tags:['MoE','Sparse'], level:'核心', open:true, china:false, next:['mixtral','deepseekv3'] },
  { id:'instruct', name:'InstructGPT', date:'2022.01', year:2022, org:'OpenAI', architecture:'Decoder-only', modality:'Text', params:'1.3B', innovation:'RLHF 将“更会续写”转变为“更遵循人类意图”。', desc:'InstructGPT 以监督微调和人类偏好强化学习建立对齐范式，直接影响 ChatGPT 与后续指令模型。', tags:['RLHF','SFT'], level:'核心', open:false, china:false, next:['chatgpt','gpt4'] },
  { id:'flamingo', name:'Flamingo', date:'2022.04', year:2022, org:'DeepMind', architecture:'Hybrid', modality:'Multimodal', params:'80B', innovation:'把冻结视觉编码器与 LLM 交织，形成少样本视觉语言模型。', desc:'Flamingo 以视觉特征与语言模型交叉注意力相连，是“LLM backbone + 视觉适配器”多模态路线的重要起点。', tags:['Cross-Attention','VLM'], level:'核心', open:false, china:false, next:['gpt4v','gemini'] },
  { id:'chatgpt', name:'ChatGPT', date:'2022.11', year:2022, org:'OpenAI', architecture:'Decoder-only', modality:'Text', params:'未公开', innovation:'将对齐模型带入大众，改变人机交互预期。', desc:'ChatGPT 让对话式大模型成为主流产品形态，推动指令微调、偏好优化与安全对齐成为行业默认能力层。', tags:['RLHF','Chat'], level:'核心', open:false, china:false, next:['gpt4','gpt4o'] },
  { id:'llama', name:'LLaMA', date:'2023.02', year:2023, org:'Meta AI', architecture:'Decoder-only', modality:'Text', params:'65B', innovation:'以高质量公开权重重启开源大模型生态。', desc:'LLaMA 展示了数据配方和算力效率的重要性，并使社区微调、量化和本地部署迅速发展，成为开源血缘的主干。', tags:['Open Weights','RoPE'], level:'核心', open:true, china:false, next:['llama2','mistral','qwen'] },
  { id:'gpt4', name:'GPT-4', date:'2023.03', year:2023, org:'OpenAI', architecture:'MoE', modality:'Text', params:'未公开', innovation:'推理、代码与复杂任务能力显著跃迁，定义前沿闭源基准。', desc:'GPT-4 展现出更可靠的复杂问题处理能力，也让能力评估、工具使用和多模态融合成为前沿模型竞争重点。', tags:['Reasoning','Alignment'], level:'核心', open:false, china:false, next:['gpt4v','gpt4o','o1'] },
  { id:'llava', name:'LLaVA', date:'2023.04', year:2023, org:'UW–Madison', architecture:'Hybrid', modality:'Multimodal', params:'13B', innovation:'用视觉指令微调把开源 LLM 接入图像理解。', desc:'LLaVA 以 CLIP 视觉编码器和 LLaMA backbone 构建开放 VLM，显著降低了多模态研究和复现门槛。', tags:['Visual Instruction','Open'], level:'核心', open:true, china:false, next:['qwen2vl','llama4'] },
  { id:'llama2', name:'Llama 2', date:'2023.07', year:2023, org:'Meta AI', architecture:'Decoder-only', modality:'Text', params:'70B', innovation:'开放商用权重，成为开源应用的广泛基础。', desc:'Llama 2 提供从基础到对话版本的完整生态，并通过公开可用的许可扩展了开源模型在产品中的影响范围。', tags:['Open Weights','GQA'], level:'核心', open:true, china:false, next:['llama3','qwen2'] },
  { id:'mistral', name:'Mistral 7B', date:'2023.09', year:2023, org:'Mistral AI', architecture:'Decoder-only', modality:'Text', params:'7B', innovation:'以滑窗注意力等高效配方重新定义小而强的开源模型。', desc:'Mistral 7B 用高效架构证明中小尺寸模型也可具备强竞争力，并催生了高性能开放权重模型的新一波创新。', tags:['GQA','Sliding Window'], level:'核心', open:true, china:false, next:['mixtral'] },
  { id:'qwen', name:'Qwen', date:'2023.09', year:2023, org:'Alibaba Cloud', architecture:'Decoder-only', modality:'Text', params:'72B', innovation:'中文与多语言能力并重，形成中国开源主干之一。', desc:'Qwen 面向中文、代码和多语言构建完整模型家族，在开放权重和可商用实践中成为国内生态的关键节点。', tags:['Chinese','Open Weights'], level:'核心', open:true, china:true, next:['qwen2','qwen2vl'] },
  { id:'gpt4v', name:'GPT-4V', date:'2023.09', year:2023, org:'OpenAI', architecture:'Hybrid', modality:'Multimodal', params:'未公开', innovation:'把强语言推理直接扩展到图像输入。', desc:'GPT-4V 让通用对话系统获得可靠视觉理解，标志多模态从研究原型进入一线产品体验。', tags:['Vision','Multimodal'], level:'重要', open:false, china:false, next:['gpt4o'] },
  { id:'gemini', name:'Gemini 1.0', date:'2023.12', year:2023, org:'Google DeepMind', architecture:'MoE', modality:'Multimodal', params:'未公开', innovation:'原生多模态训练，模糊语言模型和视觉模型边界。', desc:'Gemini 从训练阶段融合多种模态，代表原生多模态模型相对“后接视觉模块”方案的路线转换。', tags:['Native Multimodal','MoE'], level:'核心', open:false, china:false, next:['gemini15'] },
  { id:'mixtral', name:'Mixtral 8×7B', date:'2023.12', year:2023, org:'Mistral AI', architecture:'MoE', modality:'Text', params:'46.7B total / 12.9B active', innovation:'开放权重 MoE 让高容量与低激活计算同时可得。', desc:'Mixtral 将专家混合带回开源社区，成为后续开源稀疏模型设计、推理成本优化的重要参照。', tags:['MoE','Open Weights'], level:'核心', open:true, china:false, next:['deepseekv3'] },
  { id:'gemini15', name:'Gemini 1.5', date:'2024.02', year:2024, org:'Google DeepMind', architecture:'MoE', modality:'Multimodal', params:'未公开', innovation:'百万级上下文窗口把长上下文带入主流。', desc:'Gemini 1.5 将长上下文与原生多模态结合，推动视频、长文档和复杂代码库理解成为真实可用场景。', tags:['Long Context','Native Multimodal'], level:'核心', open:false, china:false, next:[] },
  { id:'llama3', name:'Llama 3', date:'2024.04', year:2024, org:'Meta AI', architecture:'Decoder-only', modality:'Text', params:'70B', innovation:'开放权重性能跨越式提升，强化开源主线。', desc:'Llama 3 以更大规模数据和训练配方缩小开源与闭源能力差距，成为大量开源应用和衍生模型的基础。', tags:['Open Weights','8K'], level:'核心', open:true, china:false, next:['llama4'] },
  { id:'qwen2', name:'Qwen2', date:'2024.06', year:2024, org:'Alibaba Cloud', architecture:'Decoder-only', modality:'Text', params:'72B', innovation:'覆盖尺寸、语言与代码的开放模型家族进一步成熟。', desc:'Qwen2 在多语言、代码和上下文能力上全面更新，补齐高质量开放权重模型的产品与研究可用性。', tags:['Multilingual','Open Weights'], level:'核心', open:true, china:true, next:['qwen25'] },
  { id:'qwen2vl', name:'Qwen2-VL', date:'2024.08', year:2024, org:'Alibaba Cloud', architecture:'Hybrid', modality:'Multimodal', params:'72B', innovation:'把文档、图像、视频理解纳入开放多模态模型。', desc:'Qwen2-VL 是中文生态中重要的开源多模态节点，展示了视觉位置编码和动态分辨率的工程实践。', tags:['Vision','Video','Chinese'], level:'核心', open:true, china:true, next:['qwen25'] },
  { id:'gpt4o', name:'GPT-4o', date:'2024.05', year:2024, org:'OpenAI', architecture:'Hybrid', modality:'Multimodal', params:'未公开', innovation:'统一实时处理文本、图像与音频，带来原生交互体验。', desc:'GPT-4o 将多模态输入输出、低延迟交互和语音体验整合，是通用 AI 助手向实时多模态演进的代表。', tags:['Native Multimodal','Audio'], level:'核心', open:false, china:false, next:['o1'] },
  { id:'o1', name:'OpenAI o1', date:'2024.09', year:2024, org:'OpenAI', architecture:'Hybrid', modality:'Text', params:'未公开', innovation:'把可扩展的测试时推理带入前沿模型主线。', desc:'o1 强化复杂推理任务的表现，显示后训练、搜索与推理时算力正在成为与预训练规模并列的新变量。', tags:['Reasoning','Test-time'], level:'核心', open:false, china:false, next:[] },
  { id:'deepseekv3', name:'DeepSeek-V3', date:'2024.12', year:2024, org:'DeepSeek', architecture:'MoE', modality:'Text', params:'671B total / 37B active', innovation:'以极致训练效率展示中国开源 MoE 的前沿竞争力。', desc:'DeepSeek-V3 通过高效 MoE 和训练系统设计进入前沿开源模型行列，成为理解稀疏大模型工程化的重要案例。', tags:['MoE','Open Weights','Chinese'], level:'核心', open:true, china:true, next:['deepseekr1'] },
  { id:'deepseekr1', name:'DeepSeek-R1', date:'2025.01', year:2025, org:'DeepSeek', architecture:'MoE', modality:'Text', params:'671B total / 37B active', innovation:'公开推理强化学习路线，引爆开源 reasoning 模型生态。', desc:'DeepSeek-R1 将强化学习驱动的推理能力与开放权重结合，激发了大量蒸馏、复现和长链推理研究。', tags:['Reasoning','RL','Open Weights'], level:'核心', open:true, china:true, next:[] },
  { id:'qwen25', name:'Qwen2.5', date:'2024.09', year:2024, org:'Alibaba Cloud', architecture:'Decoder-only', modality:'Text', params:'72B', innovation:'在代码、数学和多语言任务上提升开放模型的实用性。', desc:'Qwen2.5 持续完善中国开源主干，将通用对话、代码和工具调用能力扩展到完整模型谱系。', tags:['Coding','Chinese','Open Weights'], level:'重要', open:true, china:true, next:[] },
  { id:'llama4', name:'Llama 4', date:'2025.04', year:2025, org:'Meta AI', architecture:'MoE', modality:'Multimodal', params:'400B total', innovation:'开放权重模型进入原生多模态与 MoE 结合阶段。', desc:'Llama 4 将多模态、MoE 和开放生态放在同一模型家族中，体现开源主线与前沿架构的进一步交汇。', tags:['MoE','Multimodal','Open Weights'], level:'核心', open:true, china:false, next:[] },
];

const paths = {
  all: { label:'完整时间线', hint:'从 Transformer 出发，按时间建立全局认知。', ids:models.map(m => m.id) },
  decoder: { label:'Decoder-only 主线', hint:'从 GPT 到 LLaMA、Mistral 与 DeepSeek 的生成式主干。', ids:['transformer','gpt1','gpt2','gpt3','instruct','chatgpt','llama','llama2','mistral','mixtral','llama3','qwen2','deepseekv3','deepseekr1','llama4'] },
  encoder: { label:'Encoder-only 理解线', hint:'从 BERT 认识表征学习与语言理解范式。', ids:['transformer','bert','roberta','xlnet','vit','clip'] },
  multimodal: { label:'多模态演进线', hint:'从 ViT / CLIP 出发，走到原生多模态模型。', ids:['transformer','vit','clip','flamingo','llava','gpt4v','gemini','gemini15','gpt4o','qwen2vl','llama4'] },
  open: { label:'开源优先', hint:'聚焦可以下载权重、复现与二次开发的关键节点。', ids:models.filter(m => m.open).map(m => m.id) },
  china: { label:'中国相关路径', hint:'追踪 Qwen 与 DeepSeek 为代表的国内开源分支。', ids:['transformer','llama','qwen','llama2','qwen2','qwen2vl','qwen25','deepseekv3','deepseekr1'] }
};

const years = [2017,2018,2019,2020,2021,2022,2023,2024,2025];
const architectures = ['全部架构','Encoder-only','Decoder-only','Encoder–Decoder','MoE','Hybrid'];
const modalities = ['全部模态','Text','Vision','Multimodal'];

function App(){
  const lanes = [
    ['lane-one', 'GENERATIVE'],
    ['lane-two', 'UNDERSTANDING'],
    ['lane-three', 'MULTIMODAL'],
    ['lane-four', 'REASONING'],
  ];
  return <main>
    <header className="topbar">
      <a className="brand" href="#top" aria-label="Transformer Atlas 首页"><span className="brand-mark">✦</span><span>Transformer <b>Atlas</b></span></a>
      <div className="top-meta">2017—2025</div>
    </header>

    <section className="hero" id="top">
      <div className="hero-grid"></div><div className="orb orb-one"></div><div className="orb orb-two"></div>
      <div className="eyebrow">THE TRANSFORMER ERA</div>
      <h1>理解模型，<br/><em>从脉络开始。</em></h1>
      <p>2017—2025 的关键分叉。</p>
      <div className="hero-actions"><a href="#map" className="button primary">查看图谱 <span>↓</span></a></div>
      <div className="hero-stats"><div><strong>2017</strong><span>开始</span></div><div><strong>2025</strong><span>现在</span></div></div>
    </section>

    <section className="map-section" id="map">
      <div className="map-heading"><div><span className="section-kicker">FULL TIMELINE</span><h2>完整时间树</h2></div></div>
      <div className="atlas-wrap">
        <div className="lane-labels"><span>GENERATION</span><span>UNDERSTANDING</span><span>VISION &amp; MULTIMODAL</span><span>SPARSE &amp; REASONING</span></div>
        <div className="atlas" style={{'--count':years.length}}>
          {lanes.map(([className,label])=><div className={`lane ${className}`} key={className}><span>{label}</span></div>)}
          {years.map((y,i)=><div className="year" key={y} style={{left:`${(i/(years.length-1))*100}%`}}><span>{y}</span><i></i></div>)}
          {models.flatMap(m=>m.next.map(target=>{
            const n=models.find(x=>x.id===target); if(!n) return null;
            const start=((m.year-2017)+(Number(m.date.slice(-2))/12))/8*100; const end=((n.year-2017)+(Number(n.date.slice(-2))/12))/8*100;
            const y1=laneFor(m), y2=laneFor(n); const width=Math.max(1,end-start); const isDown=y2>=y1;
            return <div key={`${m.id}-${target}`} className={`connector ${isDown?'down':'up'} branch-${branchFor(m)}`} style={{left:`${start}%`,top:`${Math.min(y1,y2)}%`,'--width':`${width}%`,'--height':`${Math.max(2,Math.abs(y2-y1))}%`,'--delay':`${(m.year-2017)*.09}s`}}></div>
          }))}
          {models.map(m=>{
            const x=((m.year-2017)+(Number(m.date.slice(-2))/12))/8*100; const isMulti=m.modality!=='Text';
            return <div key={m.id} className={`node ${m.level==='核心'?'core-node':'important-node'} branch-${branchFor(m)} ${isMulti?'multi':''}`} style={{left:`${x}%`,top:`${laneFor(m)}%`,'--delay':`${(m.year-2017)*.1+(Number(m.date.slice(-2))/120)}s`}}><span className="node-mark">{markFor(m)}</span><span className="node-card"><b>{m.name}</b><small>{m.date}</small></span></div>
          })}
        </div>
      </div>
    </section>
  </main>
}

function branchFor(m){ if(m.architecture==='MoE' || m.tags.includes('Reasoning')) return 'reasoning'; if(m.modality!=='Text') return 'multimodal'; if(m.architecture==='Encoder-only' || m.architecture==='Encoder–Decoder') return 'understanding'; return 'generation'; }
function laneFor(m){ return {generation:18,understanding:39,multimodal:62,reasoning:83}[branchFor(m)]; }
function markFor(m){ if(/GPT|ChatGPT|o1/.test(m.name)) return '◎'; if(/Gemini/.test(m.name)) return '✦'; if(/LLaMA/.test(m.name)) return 'L'; if(/Qwen/.test(m.name)) return 'Q'; if(/DeepSeek/.test(m.name)) return 'D'; if(/Mistral|Mixtral/.test(m.name)) return 'M'; if(/BERT|RoBERTa|XLNet|T5/.test(m.name)) return 'B'; if(/ViT|CLIP|Flamingo|LLaVA/.test(m.name)) return '◈'; return 'T'; }
createRoot(document.getElementById('root')).render(<App/>);
