'use client'
import { motion } from 'framer-motion'

export default function CitationsSection() {
  const citations = [
    {
      id: 'helm',
      citation: 'Liang, P., et al. (2022). Holistic Evaluation of Language Models (HELM). Center for Research on Foundation Models (CRFM), Stanford University.',
      url: 'https://crfm.stanford.edu/helm/latest/'
    },
    {
      id: 'mmlu',
      citation: 'Hendrycks, D., Burns, C., Basart, S., Zou, A., Mazeika, M., Song, D., & Steinhardt, J. (2021). Measuring Massive Multitask Language Understanding. ICLR.',
      url: 'https://arxiv.org/abs/2009.03300'
    },
    {
      id: 'glue',
      citation: 'Wang, A., Singh, A., Michael, J., Hill, F., Levy, O., & Bowman, S. R. (2019). GLUE: A Multi‑Task Benchmark and Analysis Platform for Natural Language Understanding. ICLR.',
      url: 'https://arxiv.org/abs/1804.07461'
    },
    {
      id: 'humaneval',
      citation: 'Chen, M., Tworek, J., Jun, H., Yuan, Q., de Oliveira Pinto, H. P., Kaplan, J., … Sutskever, I. (2021). Evaluating Large Language Models Trained on Code. arXiv:2107.03374.',
      url: 'https://arxiv.org/abs/2107.03374'
    },
    {
      id: 'agentbench',
      citation: 'Liu, X., Yu, H., Zhang, H., Xu, Y., Lei, X., … Tang, J. (2024). AgentBench: Evaluating LLMs as Agents. arXiv:2308.11458.',
      url: 'https://arxiv.org/abs/2308.11458'
    },
    {
      id: 'bigbench',
      citation: 'Srivastava, A., et al. (2022). Beyond the Imitation Game: Quantifying and extrapolating the capabilities of language models. arXiv:2206.04615.',
      url: 'https://arxiv.org/abs/2206.04615'
    },
    {
      id: 'abeysinghe',
      citation: 'Abeysinghe, G., & Circi, D. (2024). The Challenges of Evaluating LLM Applications. arXiv:2402.01676.',
      url: 'https://arxiv.org/abs/2402.01676'
    },
    {
      id: 'galatolo',
      citation: 'Galatolo, F. A., et al. (2025). Beyond Ethical Alignment: Evaluating LLMs as Artificial Moral Assistants. arXiv:2508.12754.',
      url: 'https://arxiv.org/abs/2508.12754'
    },
    {
      id: 'jiao',
      citation: 'Jiao, W., et al. (2025). LLM Ethics Benchmark: A Three-Dimensional Assessment. Nature Scientific Reports.',
      url: 'https://www.nature.com/articles/s41598-025-34556-0'
    },
    {
      id: 'syntheval',
      citation: 'Heng, Y., et al. (2024). SYNTHEVAL: Hybrid Behavioral Testing of NLP Models. EMNLP 2024 Findings.',
      url: 'https://aclanthology.org/2024.findings-emnlp.102/'
    },
    {
      id: 'rag-survey',
      citation: 'Yu, T., et al. (2024). Evaluation of Retrieval-Augmented Generation: A Survey. arXiv:2405.07437.',
      url: 'https://arxiv.org/abs/2405.07437'
    },
    {
      id: 'ragas',
      citation: 'Es, S., et al. (2023). RAGAS: Automated Evaluation of Retrieval-Augmented Generation. arXiv:2309.15217.',
      url: 'https://arxiv.org/abs/2309.15217'
    },
    {
      id: 'truthfulqa',
      citation: 'Lin, S., Hilton, J., & Evans, O. (2022). TruthfulQA: Measuring How Models Mimic Human Falsehoods. arXiv:2109.07958.',
      url: 'https://arxiv.org/abs/2109.07958'
    },
    {
      id: 'helm-safety',
      citation: 'Center for Research on Foundation Models (CRFM). (2023). HELM Leaderboards—including AIR‑Bench, Safety, Finance, MedHELM.',
      url: 'https://crfm.stanford.edu/helm/latest/'
    },
    {
      id: 'oversimplification',
      citation: 'Sparks, L. D. (2025, Jul 5). AI chatbots oversimplify scientific studies and gloss over critical details — the newest models are especially guilty. Live Science.',
      url: 'https://www.livescience.com/technology/artificial-intelligence/ai-chatbots-oversimplify-scientific-studies-and-gloss-over-critical-details-the-newest-models-are-especially-guilty'
    },
    {
      id: 'premai',
      citation: 'PremAI. (2024, Dec 23). LLMs Evaluation: Benchmarks, Challenges, and Future Trends.',
      url: 'https://blog.premai.io/llm-evaluation/'
    },
    {
      id: 'openai-evals',
      citation: 'OpenAI. (2023). OpenAI Evals Framework.',
      url: 'https://github.com/openai/evals'
    },
    {
      id: 'langchain',
      citation: 'LangChain. (2024). LangChain Evaluation and LangSmith.',
      url: 'https://docs.langchain.com/docs/guides/evaluation'
    },
    {
      id: 'trulens',
      citation: 'TruEra. (2024). TruLens: Evaluation and Tracking for LLM Applications.',
      url: 'https://www.trulens.org/'
    },
    {
      id: 'mtbench',
      citation: 'LMSYS. (2023). MT-Bench: Multi-turn Benchmark for Chat Models.',
      url: 'https://github.com/lm-sys/FastChat/blob/main/docs/mt_bench.md'
    },
    {
      id: 'checklist',
      citation: 'Ribeiro, M. T., Wu, T., Guestrin, C., & Singh, S. (2020). CheckList: Behavioral Testing of NLP Models. Microsoft Research.',
      url: 'https://github.com/marcotcr/checklist'
    },
    {
      id: 'perspective',
      citation: 'Google Jigsaw. (2024). Perspective API: Toxicity Detection.',
      url: 'https://perspectiveapi.com/'
    },
    {
      id: 'detoxify',
      citation: 'Unitary AI. (2024). Detoxify: Toxicity Classification Library.',
      url: 'https://github.com/unitaryai/detoxify'
    },
    {
      id: 'gsm8k',
      citation: 'Cobbe, K., et al. (2021). Training Verifiers to Solve Math Word Problems. arXiv:2110.14168.',
      url: 'https://github.com/openai/grade-school-math'
    },
    {
      id: 'arc',
      citation: 'Clark, P., et al. (2018). Think you have Solved Question Answering? Try ARC, the AI2 Reasoning Challenge. arXiv:1803.05457.',
      url: 'https://allenai.org/data/arc'
    },
    {
      id: 'hellaswag',
      citation: 'Zellers, R., et al. (2019). HellaSwag: Can a Machine Really Finish Your Sentence? ACL 2019.',
      url: 'https://rowanzellers.com/hellaswag/'
    }
  ]

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gray-50 dark:bg-obsidian-50 transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            References & Citations
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            This guide draws on established research and industry benchmarks. Below are the key sources that informed our evaluation frameworks and testing strategies.
          </p>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <ol className="space-y-4 list-decimal list-inside">
              {citations.map((item, index) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.03 }}
                  className="text-gray-700 dark:text-gray-300 leading-relaxed pl-2"
                >
                  <span className="text-gray-900 dark:text-white">
                    {item.citation}
                  </span>
                  {item.url && (
                    <>
                      {' '}
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 dark:text-blue-400 hover:text-primary-700 dark:hover:text-blue-300 no-underline hover:underline transition-colors text-sm"
                      >
                        [Link ↗]
                      </a>
                    </>
                  )}
                </motion.li>
              ))}
            </ol>
          </div>

          <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 border border-blue-200 dark:border-blue-700">
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong className="text-gray-900 dark:text-white">Note:</strong> This is an evolving field. 
              While these sources represent current best practices and widely-adopted benchmarks, new evaluation 
              methods and frameworks continue to emerge. We encourage readers to stay updated with the latest 
              research and adapt their testing strategies accordingly.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
