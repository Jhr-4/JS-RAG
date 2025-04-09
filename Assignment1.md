Answers to https://github.com/kaw393939/js-rag-demo/blob/master/assignment1_llm_embeddings/README.md

**Q-1.**  **Evolution of Embeddings:** Briefly describe the key limitation of TF-IDF that Word2Vec aimed to solve. What limitation of sequential models (like LSTMs) did the Transformer architecture address with its attention mechanism?

> **A-1.**
> * The limitation of TF-IDF was that it couldn't understand relations between words. It mostly realied on frequencies of words. Word2Vec tried to solve this via vector embedings which can show relation of words by placing them closer if they are related or associated. 
> 
> * The limitation of sequential models, like LSTMs, that the Transformer architecture address with its attention mechanism was that it didn't really understand how words were related that were far away and work sequentially in one direction. the transformer architecture made it possible to look at whole sentances in one go. Thus it is able to see the importance and relation between any word regardless of distance.

**Q-2.**  **BERT's Contribution:** What was the significance of BERT's "bidirectional" pre-training compared to earlier models?

> **A-2.** 
> - The significance of BERT's bidirectional pre-training compared to earlier models was it was allowed the model to understand the meaning of the all words and their relations in documents. Unlike models like LSTMs/RNNs which could only look in one direction and take a step for each word, the BERT's 'bidirectional' pre-training allowed it to gain the context of a word and how it's used from words before and after in one step. 

**Q-3.**  **BERT vs. Ada:** Create a table summarizing the key differences (pros/cons) between using a locally run Sentence-BERT model versus the OpenAI `text-embedding-ada-002` API for generating embeddings in a project.

> **A-3.** 
> | Pros using BERT over OpenAI | Cons of Using BERT over OpenAI |
> |:----------------------------|:-------------------------------|
> | - Runs locally with no files sent to OpenAI (maintains full Privacy & Security). | - Depending on your hardware, it might be a slower process and may not be able to have as many input tokens. |
> | - You can customize the model to however you want it. | - You need to know how to set it up and go through the process while OpenAI's is very easy to use just need the API Key|
> | - No cost per token if it's locally. | - You must have a powerful GPU/computer usally to have a good enough model. |

**Q-4.**  **Chunking Scenario:** Imagine you have a large PDF textbook (1000 pages) that you want to use for RAG.

- **Q-4a.** Why is chunking absolutely necessary here (consider model input limits)?
> - **A-4a.** chunking is absolutely necessary here because the input file would be too large to retain all the information with clear detail. Chunking helps break the pages down into smaller sections which can be later easily accessed and would mean these smaller details in the sections aren't lost in the larger context of the whole 1000 pages. Additionally, usally it would require more power & memory to have all the pages in one chunk compared to seperate smaller ones. Many times there's a maximum input token limit which can't be passed.

- **Q4-b** Describe *two* different chunking strategies you could use.
> - **A-4b.** Two potential examples of chunking strategies you could use are to chunking by fixed sizes/lengths and recursive character chunking. Chunking by fixed sizes/length just means to chunk by a certain number of characters/words/tokens. While this may work, it would mean some sentences or even words are cut off to early leading to context of it to be lost or change. Chunking by recursive character chunking would mean to constantly split on some form of section/dividers. For example, starting by splitting paragraphs denoted by a `\n` then a `.` for sentences and then a space for words. 

- **Q-4c.** What factors would influence your choice of chunk *size* and *overlap*?
> - **A-4c.** You may choose decide upon different chunk sizes and overlap based on many factors. For example, you firstly would want a size that's within the token limit of the model. Additionally, after this you may choose on how much information/detail you want. For example if you want just the general idea you may have something bigger while if you want something highly precise/detailed you would want something with higher chunk size and bigger overlap to have better context.

**Q-5.**  **Model Selection Rationale:** For each scenario below, which embedding approach (OpenAI Ada vs. Local SBERT) might be more suitable and *why*? Justify your choice based on the factors discussed (cost, privacy, performance, quality, ease of use).

>**A-5.**
> 
> * A startup building a quick prototype chatbot for public website FAQs.
>   * If it's a quick prototype chatbot for public website FAQ's it would be easier to implement the embedding with OpenAI Ada as it would require less setup. Also as this is public information (for a public site) privacy wouldn't be an issue. However, if they would like to have an approach with no cost on tokens, they may want to look into using their own local SBERT that runs on their server and is connected to their website.
> * A hospital developing an internal system to search sensitive patient record summaries (anonymized for the search, of course!).
>   * For a hospital developing an intern system, a SBERT would be recommended. This is mainly due to reasons of privacy. To maintain the HIPAA rules, the hospital can't share details of patients with others even if it's OpenAI. Utilizing OpenAI Ada would mean sending the patient data directly to OpenAI. While yes, the OpenAI one may be easier to implement and have more input tokens, it would break HIPPA laws and not be great to use with sensitive patient data.
> * A solo developer building a personal note-taking app with semantic search features, running only on their own powerful desktop PC.
>   * As this is a personal application and the developer has a powerful PC, they would be better off implementing a local SBERT embedding. Additionally, as they are already a developer, it wouldn't be too hard for them to implement this compared to a beginner. Having the local version would also allow more customizability.
>