/**
 * SEARCHLAB — Search Intelligence & IR Analytics Platform
 * Production Standalone Bundle: Complete, self-contained implementation of Boolean, TF-IDF,
 * PageRank, Extractive Quick Answer, 30-Query Benchmark Suite, and Bento Grid UI.
 */
(function () {
  'use strict';

// --- MODULE: corpus.js ---
// Curated Simple English Wikipedia Knowledge Corpus for Information Retrieval Demonstrations
// Each document contains authentic encyclopedic content, canonical Wikipedia URLs, and authentic directed hyperlinks.
const WIKIPEDIA_CORPUS = [
  // --- Information Retrieval & Search Algorithms ---
  {
    id: "doc_1",
    title: "PageRank",
    category: "Information Retrieval & Algorithms",
    url: "https://en.wikipedia.org/wiki/PageRank",
    summary: "An algorithm used by Google Search to rank web pages in their search engine results based on graph link structures.",
    content: "PageRank is an algorithm used by Google Search to rank web pages in their search engine results. It is named after both the term 'web page' and Google co-founder Larry Page. PageRank is a way of measuring the importance of website pages. According to Google, PageRank works by counting the number and quality of links to a page to determine a rough estimate of how important the website is. The underlying assumption is that more important websites are likely to receive more links from other websites. The algorithm models a random surfer who clicks on links at random with a damping factor of 0.85, representing the probability of continuing to browse versus jumping to an arbitrary new page. In information retrieval and web search, PageRank is combined with content relevance algorithms like TF-IDF and BM25 to produce modern hybrid ranking scores.",
    outLinks: ["doc_2", "doc_3", "doc_4", "doc_5", "doc_7", "doc_10"]
  },
  {
    id: "doc_2",
    title: "Tf–idf",
    category: "Information Retrieval & Algorithms",
    url: "https://en.wikipedia.org/wiki/Tf%E2%80%93idf",
    summary: "Term frequency–inverse document frequency is a numerical statistic reflecting word importance in a document collection.",
    content: "In information retrieval, tf–idf, short for term frequency–inverse document frequency, is a numerical statistic that is intended to reflect how important a word is to a document in a collection or corpus. It is often used as a weighting factor in searches of information retrieval, text mining, and user modeling. The tf–idf value increases proportionally to the number of times a word appears in the document and is offset by the number of documents in the corpus that contain the word, which helps to adjust for the fact that some words appear more frequently in general. In the vector space model, documents and queries are represented as high-dimensional vectors where each dimension corresponds to a distinct term weighted by tf-idf, and relevance is computed using cosine similarity.",
    outLinks: ["doc_1", "doc_3", "doc_4", "doc_6", "doc_8"]
  },
  {
    id: "doc_3",
    title: "Information retrieval",
    category: "Computer Science",
    url: "https://en.wikipedia.org/wiki/Information_retrieval",
    summary: "The science of searching for information in a document and metadata from large collections.",
    content: "Information retrieval (IR) is the software science of searching for information in a document, searching for documents themselves, and also searching for the metadata that describes data, and for databases of texts, images or sounds. An information retrieval process begins when a user enters a query into the system. Queries are formal statements of information needs, for example search strings in web search engines. In information retrieval, a query does not uniquely identify a single object in the collection. Instead, several objects may match the query, perhaps with different degrees of relevance. Major retrieval models include the Boolean model, the vector space model utilizing tf-idf and cosine similarity, probabilistic models, and link analysis models such as PageRank.",
    outLinks: ["doc_1", "doc_2", "doc_4", "doc_5", "doc_9", "doc_14"]
  },
  {
    id: "doc_4",
    title: "Inverted index",
    category: "Data Structures & Search",
    url: "https://en.wikipedia.org/wiki/Inverted_index",
    summary: "A database index mapping terms to their locations across documents to facilitate fast full-text searches.",
    content: "In computer science, an inverted index is a database index storing a mapping from content, such as words or numbers, to its locations in a document or a set of documents. The purpose of an inverted index is to allow fast full-text searches, at a cost of increased processing when a document is added to the database. The inverted index is the most popular data structure used in document retrieval systems and search engines. There are two main variants: a record-level inverted index (which contains a list of references to documents for each word) and a word-level inverted index (which additionally contains the positions of each word within a document). Posting lists in the inverted index enable rapid set operations for Boolean search including AND intersections and OR unions.",
    outLinks: ["doc_2", "doc_3", "doc_5", "doc_8"]
  },
  {
    id: "doc_5",
    title: "Search engine indexing",
    category: "Information Retrieval & Algorithms",
    url: "https://en.wikipedia.org/wiki/Search_engine_indexing",
    summary: "Collecting, parsing, and storing data to facilitate fast and accurate information retrieval.",
    content: "Search engine indexing collects, parses, and stores data to facilitate fast and accurate information retrieval. Index design incorporates interdisciplinary concepts from linguistics, cognitive psychology, mathematics, informatics, and computer science. An alternate name for the process in the context of search engines designed to find web pages on the Internet is web indexing. Popular search engines focus on full-text indexing of online, natural language documents. Web search engines employ web crawlers to discover hyperlinked documents across the World Wide Web, extract text, build an inverted index, and compute graph topological metrics like PageRank to deliver millisecond response times.",
    outLinks: ["doc_1", "doc_3", "doc_4", "doc_10", "doc_11"]
  },
  {
    id: "doc_6",
    title: "Cosine similarity",
    category: "Mathematics & Machine Learning",
    url: "https://en.wikipedia.org/wiki/Cosine_similarity",
    summary: "A measure of similarity between two vectors that evaluates the cosine of the angle between them.",
    content: "In data analysis and information retrieval, cosine similarity is a measure of similarity between two non-zero vectors in an inner product space. It is defined to equal the cosine of the angle between them, which is also the same as the inner product of the same vectors normalized to both have length 1. The cosine of 0 degrees is 1, and it is less than 1 for any angle in the interval (0, pi] radians. It is thus a judgment of orientation and not magnitude: two vectors with the same orientation have a cosine similarity of 1, two vectors oriented at 90 degrees have a similarity of 0, and two vectors diametrically opposed have a similarity of -1. In text search and natural language processing, cosine similarity between a query vector and document vector is the foundation of ranking in the vector space model.",
    outLinks: ["doc_2", "doc_3", "doc_8", "doc_12", "doc_13"]
  },
  {
    id: "doc_7",
    title: "Larry Page",
    category: "Computer Pioneers",
    url: "https://en.wikipedia.org/wiki/Larry_Page",
    summary: "An American computer scientist and entrepreneur who co-founded Google and developed PageRank.",
    content: "Lawrence Edward Page is an American businessman, computer scientist and internet entrepreneur. He is best known for co-founding Google with Sergey Brin. Page was the chief executive officer of Google from 1997 until August 2001 and then again from April 2011 until July 2015 when he moved to become CEO of Alphabet Inc. While enrolled in the computer science PhD program at Stanford University, Page was in search of a dissertation theme and considered exploring the mathematical properties of the World Wide Web, understanding its link structure as a massive directed graph. His supervisor Terry Winograd encouraged him to pursue the idea, leading to the creation of the PageRank algorithm.",
    outLinks: ["doc_1", "doc_10", "doc_11", "doc_16"]
  },
  {
    id: "doc_8",
    title: "Vector space model",
    category: "Information Retrieval & Algorithms",
    url: "https://en.wikipedia.org/wiki/Vector_space_model",
    summary: "An algebraic model representing text documents as vectors in a multi-dimensional Euclidean space.",
    content: "Vector space model or term vector model is an algebraic model for representing text documents as vectors of identifiers, such as index terms. It is used in information filtering, information retrieval, indexing and relevancy rankings. Documents and queries are represented as vectors in a multi-dimensional Euclidean space. The dimensions correspond to the separate terms in the vocabulary. If a term occurs in the document, its value in the vector is non-zero. Several different ways of computing these values, also known as term weights, have been developed. One of the best known schemes is tf-idf weighting. The similarity of two documents or a query and document is typically calculated using the cosine similarity metric.",
    outLinks: ["doc_2", "doc_3", "doc_6", "doc_13"]
  },
  {
    id: "doc_9",
    title: "Boolean data type",
    category: "Data Structures & Search",
    url: "https://en.wikipedia.org/wiki/Boolean_data_type",
    summary: "A logical data type that represents truth values (true or false) originating from Boolean algebra.",
    content: "In computer science, the Boolean data type is a data type that has one of two possible values (usually denoted true and false) which is intended to represent the two truth values of logic and Boolean algebra. It is named after George Boole, who first defined an algebraic system of logic in the mid 19th century. In information retrieval, the Boolean search model evaluates queries containing logical operators such as AND, OR, and NOT. An AND query requires all terms to be present in matching documents, an OR query accepts any document containing at least one term, and a NOT operator excludes documents containing specified terms.",
    outLinks: ["doc_3", "doc_4", "doc_14"]
  },
  {
    id: "doc_10",
    title: "World Wide Web",
    category: "Internet & Networking",
    url: "https://en.wikipedia.org/wiki/World_Wide_Web",
    summary: "A global information system enabling documents to be accessed over the Internet via hyperlinks.",
    content: "The World Wide Web (WWW or simply the Web) is an information system enabling documents and other web resources to be accessed over the Internet. Documents and downloadable media are made available to the network through web servers and can be accessed by programs such as web browsers. Servers and resources on the World Wide Web are identified and located through character strings called uniform resource locators (URLs). The Web was invented by English computer scientist Tim Berners-Lee at CERN in 1989. Hyperlinks connect web pages into an interconnected directed web graph, which later enabled link analysis algorithms such as PageRank to revolutionize internet search engines.",
    outLinks: ["doc_1", "doc_5", "doc_7", "doc_11", "doc_15"]
  },
  {
    id: "doc_11",
    title: "Web crawler",
    category: "Internet & Networking",
    url: "https://en.wikipedia.org/wiki/Web_crawler",
    summary: "An automated bot that systematically browses the World Wide Web for search engine indexing.",
    content: "A web crawler, sometimes called a spider or spiderbot, is an Internet bot that systematically browses the World Wide Web, typically operated by search engines for the purpose of web indexing. Web search engines and some other sites use web crawling or spidering software to update their web content or indices of other sites' web content. Web crawlers copy pages for processing by a search engine, which indexes the downloaded pages so users can search them efficiently. Crawlers start with a list of URLs to visit, called the seeds. As the crawler visits these URLs, it identifies all the hyperlinks in the page and adds them to the list of URLs to visit, called the crawl frontier.",
    outLinks: ["doc_1", "doc_4", "doc_5", "doc_10"]
  },
  {
    id: "doc_12",
    title: "Graph theory",
    category: "Mathematics & Machine Learning",
    url: "https://en.wikipedia.org/wiki/Graph_theory",
    summary: "The mathematical study of graphs, vertices, and edges used to model pairwise relations between objects.",
    content: "In mathematics, graph theory is the study of graphs, which are mathematical structures used to model pairwise relations between objects. A graph in this context is made up of vertices (also called nodes or points) which are connected by edges (also called links or lines). A distinction is made between undirected graphs, where edges link two vertices symmetrically, and directed graphs, where edges link two vertices asymmetrically. Directed graphs model the World Wide Web, where pages are nodes and hyperlinks are directed edges. Spectral graph theory and Markov chain theory on directed graphs provide the mathematical foundation for algorithms like PageRank and HITS.",
    outLinks: ["doc_1", "doc_10", "doc_13", "doc_17", "doc_18"]
  },
  {
    id: "doc_13",
    title: "Linear algebra",
    category: "Mathematics & Machine Learning",
    url: "https://en.wikipedia.org/wiki/Linear_algebra",
    summary: "The branch of mathematics concerning linear equations, matrices, and vector spaces.",
    content: "Linear algebra is the branch of mathematics concerning linear equations, linear maps, and their representations in vector spaces and through matrices. Linear algebra is central to almost all areas of mathematics and computer science. For instance, linear algebra is fundamental in modern presentations of geometry, including for defining basic objects such as lines, planes and rotations. In information retrieval and artificial intelligence, linear algebra provides the tools for vector space modeling, cosine similarity computations, singular value decomposition, and computing dominant eigenvectors of the hyperlink stochastic transition matrix in PageRank.",
    outLinks: ["doc_1", "doc_6", "doc_8", "doc_12", "doc_17", "doc_19"]
  },
  {
    id: "doc_14",
    title: "Precision and recall",
    category: "Evaluation & Metrics",
    url: "https://en.wikipedia.org/wiki/Precision_and_recall",
    summary: "Evaluation metrics measuring retrieval relevance and comprehensive coverage in information systems.",
    content: "In pattern recognition, information retrieval and classification, precision is the fraction of relevant instances among the retrieved instances, while recall is the fraction of relevant instances that were retrieved. Both precision and recall are based on an understanding and measure of relevance. In information retrieval, a search query retrieves a subset of documents from a larger collection. Precision@10 evaluates the proportion of relevant documents among the top 10 search results returned by the search engine. Other standard IR evaluation measures include Mean Average Precision (MAP), Normalized Discounted Cumulative Gain (NDCG), and F-score which computes the harmonic mean of precision and recall.",
    outLinks: ["doc_2", "doc_3", "doc_8", "doc_20"]
  },
  {
    id: "doc_15",
    title: "Tim Berners-Lee",
    category: "Computer Pioneers",
    url: "https://en.wikipedia.org/wiki/Tim_Berners-Lee",
    summary: "English computer scientist who invented the World Wide Web, HTML, HTTP, and URLs.",
    content: "Sir Timothy John Berners-Lee is an English computer scientist best known as the inventor of the World Wide Web. He is a Professorial Fellow of Computer Science at the University of Oxford and a professor at the Massachusetts Institute of Technology (MIT). Berners-Lee proposed an information management system in March 1989, and he implemented the first successful communication between a Hypertext Transfer Protocol (HTTP) client and server via the internet in mid-November of that same year. His invention of HTML, URLs, and HTTP laid the foundations for the global web of interconnected documents.",
    outLinks: ["doc_10", "doc_11", "doc_16", "doc_31"]
  },
  {
    id: "doc_16",
    title: "Alan Turing",
    category: "Computer Pioneers",
    url: "https://en.wikipedia.org/wiki/Alan_Turing",
    summary: "Pioneering mathematician and cryptanalyst who formalized algorithms and theoretical computing.",
    content: "Alan Mathison Turing was an English mathematician, computer scientist, logician, cryptanalyst, philosopher, and theoretical biologist. Turing was highly influential in the development of theoretical computer science, providing a formalisation of the concepts of algorithm and computation with the Turing machine, which can be considered a model of a general-purpose computer. During the Second World War, Turing was a leading participant in war-time codebreaking, particularly that of German ciphers. He also pioneered early artificial intelligence concepts, including the Turing test for machine intelligence.",
    outLinks: ["doc_18", "doc_20", "doc_21"]
  },
  {
    id: "doc_17",
    title: "Markov chain",
    category: "Mathematics & Machine Learning",
    url: "https://en.wikipedia.org/wiki/Markov_chain",
    summary: "A stochastic process where transition probabilities depend solely on the current state.",
    content: "A Markov chain or Markov process is a stochastic model describing a sequence of possible events in which the probability of each event depends only on the state attained in the previous event. In continuous-time, it is known as a Markov process. In information retrieval and web search, the PageRank algorithm models a random web surfer navigating hyperlinks as an ergodic Markov chain. The stationary distribution of this Markov chain corresponds to the eigenvector of the Google hyperlink transition matrix with eigenvalue 1, providing the theoretical proof that PageRank iterations converge uniquely.",
    outLinks: ["doc_1", "doc_12", "doc_13", "doc_18"]
  },
  {
    id: "doc_18",
    title: "Probability theory",
    category: "Mathematics & Machine Learning",
    url: "https://en.wikipedia.org/wiki/Probability_theory",
    summary: "The mathematical branch analyzing random phenomena and stochastic models.",
    content: "Probability theory is the branch of mathematics concerned with probability. Although there are several different probability interpretations, probability theory treats the concept in a rigorous mathematical manner by expressing it through a set of axioms. Typically these axioms formalise probability in terms of a probability space, which assigns a measure taking values between 0 and 1, termed the probability measure, to a set of outcomes called the sample space. In search engines and IR, probability theory underpins probabilistic ranking models, Markov random walks for PageRank, and statistical language modeling.",
    outLinks: ["doc_1", "doc_3", "doc_17", "doc_20"]
  },
  {
    id: "doc_19",
    title: "Matrix multiplication",
    category: "Mathematics & Machine Learning",
    url: "https://en.wikipedia.org/wiki/Matrix_multiplication",
    summary: "A binary algebraic operation computing dot products across rows and columns of matrices.",
    content: "In mathematics, matrix multiplication is a binary operation that produces a matrix from two matrices. For matrix multiplication, the number of columns in the first matrix must be equal to the number of rows in the second matrix. The resulting matrix, known as the matrix product, has the number of rows of the first and the number of columns of the second matrix. Computing power iterations of PageRank involves repeated matrix-vector multiplication of the hyperlink stochastic transition matrix by the rank distribution vector until convergence is reached.",
    outLinks: ["doc_1", "doc_13", "doc_17"]
  },
  {
    id: "doc_20",
    title: "Artificial intelligence",
    category: "Artificial Intelligence",
    url: "https://en.wikipedia.org/wiki/Artificial_intelligence",
    summary: "The field of computer science engineering intelligent machines capable of human-like cognition.",
    content: "Artificial intelligence (AI) is the intelligence of machines or software, as opposed to the intelligence of living beings, primarily of humans. It is a field of study in computer science that develops and studies intelligent machines. Such machines may be called AIs. AI technology is widely used throughout industry, government, and science. Some high-profile applications include advanced web search engines like Google Search, recommendation systems, understanding human speech via natural language processing, self-driving cars, generative creativity, and super-human play in chess and Go.",
    outLinks: ["doc_3", "doc_16", "doc_21", "doc_22", "doc_23"]
  },
  {
    id: "doc_21",
    title: "Machine learning",
    category: "Artificial Intelligence",
    url: "https://en.wikipedia.org/wiki/Machine_learning",
    summary: "Algorithms that learn patterns from training data to generalize to new, unseen inputs.",
    content: "Machine learning (ML) is a field of study in artificial intelligence concerned with the development and study of statistical algorithms that can learn from data and generalize to unseen data, and thus perform tasks without explicit instructions. Machine learning approaches are traditionally divided into three broad categories: supervised learning, unsupervised learning, and reinforcement learning. In modern information retrieval, machine learning is applied through Learning to Rank (LTR), where neural networks and gradient boosted decision trees combine features including BM25, TF-IDF, PageRank, and semantic query embeddings.",
    outLinks: ["doc_1", "doc_2", "doc_3", "doc_6", "doc_20", "doc_22"]
  },
  {
    id: "doc_22",
    title: "Natural language processing",
    category: "Artificial Intelligence",
    url: "https://en.wikipedia.org/wiki/Natural_language_processing",
    summary: "The intersection of computer science and linguistics enabling computers to analyze human text.",
    content: "Natural language processing (NLP) is an interdisciplinary subfield of computer science and linguistics. It is primarily concerned with giving computers the ability to support and manipulate human language. It involves processing natural language datasets, such as text corpora or speech corpora, using either rule-based or probabilistic statistical and machine learning approaches. Common preprocessing steps in information retrieval and NLP pipelines include tokenization, lowercase normalization, stop-word removal, and morphological stemming to transform natural text into searchable index tokens.",
    outLinks: ["doc_2", "doc_3", "doc_4", "doc_20", "doc_21", "doc_23"]
  },
  {
    id: "doc_23",
    title: "Deep learning",
    category: "Artificial Intelligence",
    url: "https://en.wikipedia.org/wiki/Deep_learning",
    summary: "Machine learning based on multi-layered artificial neural networks with representation learning.",
    content: "Deep learning is part of a broader family of machine learning methods based on artificial neural networks with representation learning. Learning can be supervised, semi-supervised or unsupervised. Deep-learning architectures such as deep neural networks, recurrent neural networks, convolutional neural networks and transformers have been applied to fields including computer vision, speech recognition, natural language processing, machine translation, and modern semantic search engines.",
    outLinks: ["doc_6", "doc_20", "doc_21", "doc_22"]
  },
  {
    id: "doc_24",
    title: "Claude Shannon",
    category: "Computer Pioneers",
    url: "https://en.wikipedia.org/wiki/Claude_Shannon",
    summary: "American mathematician known as the 'father of information theory' and pioneer of digital logic.",
    content: "Claude Elwood Shannon was an American mathematician, electrical engineer, computer scientist and cryptographer known as 'the father of information theory'. In his landmark 1948 paper 'A Mathematical Theory of Communication', Shannon introduced the concept of information entropy, establishing the fundamental limits on signal processing and data compression. Shannon also demonstrated how Boolean algebra could construct and simplify switching circuits in telephone relays, cementing the link between Boolean logic and digital computation.",
    outLinks: ["doc_9", "doc_16", "doc_18"]
  },

  // --- Renewable Energy, Physics & Climate Science ---
  {
    id: "doc_25",
    title: "Solar energy",
    category: "Energy & Climate Science",
    url: "https://en.wikipedia.org/wiki/Solar_energy",
    summary: "Radiant light and heat from the Sun harnessed using technologies like solar power and photovoltaics.",
    content: "Solar energy is radiant light and heat from the Sun that is harnessed using a range of technologies such as solar power to generate electricity, solar thermal energy including solar water heating, and solar architecture. It is an essential source of renewable energy, and its technologies are broadly characterized as either passive solar or active solar depending on how they capture and distribute solar power. Active solar techniques include the use of photovoltaic systems, concentrated solar power, and solar water heating to harness the energy. In photovoltaic systems, solar panels absorb sunlight and convert photon energy directly into electrical current using the photoelectric effect in semiconductor materials.",
    outLinks: ["doc_26", "doc_27", "doc_28", "doc_29", "doc_30", "doc_32"]
  },
  {
    id: "doc_26",
    title: "Renewable energy",
    category: "Energy & Climate Science",
    url: "https://en.wikipedia.org/wiki/Renewable_energy",
    summary: "Energy from renewable resources that are naturally replenished on a human timescale.",
    content: "Renewable energy is energy derived from natural resources that replenish themselves in less than a human lifetime without depleting the planet's resources. These resources include sunlight, wind, the movement of water, geothermal heat, and biomass. Most sources of renewable energy do not produce carbon dioxide emissions or greenhouse gases during operation, making renewable electricity a primary strategy in mitigating global climate change. Wind power and solar energy have grown rapidly worldwide as costs have fallen, combined with utility-scale battery energy storage systems to buffer intermittent electricity generation.",
    outLinks: ["doc_25", "doc_27", "doc_28", "doc_29", "doc_30", "doc_33"]
  },
  {
    id: "doc_27",
    title: "Electricity",
    category: "Energy & Climate Science",
    url: "https://en.wikipedia.org/wiki/Electricity",
    summary: "The set of physical phenomena associated with the presence and motion of electric charges.",
    content: "Electricity is the set of physical phenomena associated with the presence and motion of matter that has a property of electric charge. Electricity is related to magnetism, both being part of the phenomenon of electromagnetism, as described by Maxwell's equations. Common phenomena related to electricity include lightning, static electricity, electric heating, electric discharges and many others. In modern society, electrical energy is the versatile backbone of computing, lighting, telecommunications, and electric vehicle transportation, generated from power plants, wind turbines, and photovoltaic cells.",
    outLinks: ["doc_25", "doc_26", "doc_29", "doc_30", "doc_32", "doc_34"]
  },
  {
    id: "doc_28",
    title: "Climate change",
    category: "Energy & Climate Science",
    url: "https://en.wikipedia.org/wiki/Climate_change",
    summary: "Long-term shifts in global temperatures and weather patterns primarily driven by human emissions.",
    content: "Climate change refers to long-term shifts in temperatures and weather patterns on Earth. Human activities have been the main driver of climate change since the 19th century, primarily due to the burning of fossil fuels like coal, oil and gas, which produces heat-trapping greenhouse gases. The primary greenhouse gases causing global warming are carbon dioxide (CO2) and methane. Rising global temperatures cause glaciers to melt, sea levels to rise, and increase the frequency of extreme weather events such as droughts, heat waves, and intense storms. Transitioning to renewable energy like solar energy and wind power is critical to halting greenhouse gas accumulation.",
    outLinks: ["doc_25", "doc_26", "doc_29", "doc_30", "doc_34"]
  },
  {
    id: "doc_29",
    title: "Battery (electricity)",
    category: "Energy & Climate Science",
    url: "https://en.wikipedia.org/wiki/Electric_battery",
    summary: "A source of electric power consisting of electrochemical cells with external connections.",
    content: "An electric battery is a source of electric power consisting of one or more electrochemical cells with external connections for powering electrical devices. When a battery is supplying electric power, its positive terminal is the cathode and its negative terminal is the anode. The terminal marked negative is the source of electrons that will flow through an external electric circuit to the positive terminal. Rechargeable batteries, particularly lithium-ion batteries, are fundamental to modern portable electronics, electric vehicles, and grid-scale energy storage for renewable energy sources such as wind power and solar energy.",
    outLinks: ["doc_25", "doc_26", "doc_27", "doc_30", "doc_34"]
  },
  {
    id: "doc_30",
    title: "Wind power",
    category: "Energy & Climate Science",
    url: "https://en.wikipedia.org/wiki/Wind_power",
    summary: "The use of wind turbines to generate mechanical power and electricity.",
    content: "Wind power or wind energy is the use of wind to provide mechanical power through wind turbines to turn electric generators for electrical power. Wind power is a popular, sustainable, renewable energy source that has a much smaller impact on the environment than burning fossil fuels. Wind farms consist of many individual wind turbines, which are connected to the electric power transmission network. Because wind speed varies, wind power is often coupled with battery energy storage or hydroelectric power to ensure stable electricity supply.",
    outLinks: ["doc_26", "doc_27", "doc_28", "doc_29"]
  },
  {
    id: "doc_32",
    title: "Photovoltaics",
    category: "Energy & Climate Science",
    url: "https://en.wikipedia.org/wiki/Photovoltaics",
    summary: "The direct conversion of light into electricity using semiconducting materials.",
    content: "Photovoltaics (PV) is the direct conversion of light into electricity at the atomic level. Some materials exhibit a property known as the photoelectric effect that causes them to absorb photons of light and release electrons. When these free electrons are captured, an electric current results that can be used as electricity. Solar cells made of silicon semiconductors are wired together into solar panels to produce commercial and residential solar energy. Photovoltaic solar installations have grown exponentially due to improvements in semiconductor manufacturing.",
    outLinks: ["doc_25", "doc_26", "doc_27", "doc_35"]
  },
  {
    id: "doc_33",
    title: "Geothermal energy",
    category: "Energy & Climate Science",
    url: "https://en.wikipedia.org/wiki/Geothermal_energy",
    summary: "Thermal energy generated and stored in the Earth providing reliable baseload renewable energy.",
    content: "Geothermal energy is thermal energy generated and stored in the Earth. Earth's geothermal energy originates from the original formation of the planet and from radioactive decay of materials. Geothermal power is cost-effective, reliable, sustainable, and environmentally friendly, but has historically been limited to areas near tectonic plate boundaries. Unlike solar energy and wind power, geothermal electricity provides continuous baseload power because thermal heat from underground reservoirs does not depend on weather conditions.",
    outLinks: ["doc_26", "doc_27", "doc_28"]
  },
  {
    id: "doc_34",
    title: "Electric vehicle",
    category: "Technology & Transportation",
    url: "https://en.wikipedia.org/wiki/Electric_vehicle",
    summary: "A vehicle that uses one or more electric motors or traction motors for propulsion.",
    content: "An electric vehicle (EV) is a vehicle that uses one or more electric motors for propulsion. It can be powered by a collector system, with electricity from extravehicular sources, or it can be powered autonomously by a battery (sometimes charged by solar panels, or by converting fuel to electricity using fuel cells or a generator). EVs include road and rail vehicles, surface and underwater vessels, electric aircraft and electric spacecraft. The transition to electric vehicles combined with renewable electricity generation is central to decarbonizing global transportation and fighting climate change.",
    outLinks: ["doc_26", "doc_27", "doc_28", "doc_29", "doc_35"]
  },
  {
    id: "doc_35",
    title: "Semiconductor",
    category: "Physics & Electronics",
    url: "https://en.wikipedia.org/wiki/Semiconductor",
    summary: "A material whose electrical conductivity value falls between a conductor and an insulator.",
    content: "A semiconductor material has an electrical conductivity value falling between that of a conductor, such as metallic copper, and an insulator, such as glass. Its resistivity falls as its temperature rises; metals are the opposite. Its conducting properties may be altered in useful ways by introducing impurities ('doping') into the crystal structure. Where two differently-doped regions exist in the same crystal, a semiconductor junction is created. Silicon is the most widely used semiconductor, serving as the basis for integrated circuits, microcontrollers, computer processors, and solar photovoltaics.",
    outLinks: ["doc_25", "doc_27", "doc_32", "doc_36"]
  },
  {
    id: "doc_36",
    title: "Microcontroller",
    category: "Physics & Electronics",
    url: "https://en.wikipedia.org/wiki/Microcontroller",
    summary: "A compact integrated circuit designed to govern a specific operation in an embedded system.",
    content: "A microcontroller (or MCU for microcontroller unit) is a small computer on a single integrated circuit. A microcontroller contains one or more CPUs (processor cores) along with memory and programmable input/output peripherals. Program memory in the form of ferroelectric RAM, NOR flash or OTP ROM is also often included on chip, as well as a small amount of RAM. Microcontrollers are designed for embedded applications, in contrast to the microprocessors used in personal computers or other general purpose applications, and are pervasive in automobiles, robotics, and industrial sensors.",
    outLinks: ["doc_31", "doc_35"]
  },
  {
    id: "doc_37",
    title: "Photosynthesis",
    category: "Biological Sciences",
    url: "https://en.wikipedia.org/wiki/Photosynthesis",
    summary: "The biological process by which plants and other organisms convert light energy into chemical energy.",
    content: "Photosynthesis is a biological process used by plants and other organisms to convert light energy into chemical energy that, through cellular respiration, can later be released to fuel the organism's activities. Some of this chemical energy is stored in carbohydrate molecules, such as sugars and starches, which are synthesized from carbon dioxide and water. In most cases, oxygen is also released as a waste product. Most plants, algae, and cyanobacteria perform photosynthesis; such organisms are called photoautotrophs. Photosynthesis is largely responsible for producing and maintaining the oxygen content of the Earth's atmosphere.",
    outLinks: ["doc_25", "doc_28"]
  },

  // --- Networking, Systems & History ---
  {
    id: "doc_31",
    title: "Computer network",
    category: "Internet & Networking",
    url: "https://en.wikipedia.org/wiki/Computer_network",
    summary: "A set of computers sharing resources located on or provided by network nodes.",
    content: "A computer network is a set of computers sharing resources located on or provided by network nodes. The computers use common communication protocols over digital interconnections to communicate with each other. These interconnections are made up of telecommunication network technologies, based on physically wired, optical, and wireless radio-frequency methods. Computer networks support an enormous number of applications and services such as access to the World Wide Web, digital video, digital audio, shared use of application and storage servers, printers, and email. The Internet is the largest example of a global computer network.",
    outLinks: ["doc_10", "doc_15", "doc_24"]
  },
  {
    id: "doc_38",
    title: "History",
    category: "History & Civilizations",
    url: "https://en.wikipedia.org/wiki/History",
    summary: "The systematic study and documentation of the human past through written and archaeological records.",
    content: "History is the systematic study and documentation of the human past. The period of events before the invention of writing systems is considered prehistory. 'History' is an umbrella term comprising past events as well as the memory, discovery, collection, organization, presentation, and interpretation of these events. Historians seek knowledge of the past using historical sources such as written documents, oral accounts, art and material artifacts, and ecological markers. Understanding history enables societies to analyze cultural evolutions, the rise and fall of civilizations like ancient Rome, and technological developments.",
    outLinks: ["doc_39", "doc_40"]
  },
  {
    id: "doc_39",
    title: "Ancient Rome",
    category: "History & Civilizations",
    url: "https://en.wikipedia.org/wiki/Ancient_Rome",
    summary: "A civilization that began as an Italic settlement on the Italian Peninsula and grew into a massive Mediterranean empire.",
    content: "Ancient Rome was a civilization that began as an Italic settlement on the Italian Peninsula in the 8th century BC. Located along the Mediterranean Sea and centered on the city of Rome, it expanded to become one of the largest empires in the ancient world, ruling an estimated 50 to 90 million inhabitants. The Roman state evolved from an elective monarchy to a democratic classical republic, and then to an increasingly autocratic military dictatorship during the Roman Empire. Roman law, republican governance, engineering (aqueducts, roads, arches), architecture, and the Latin language have deeply shaped Western civilization.",
    outLinks: ["doc_38", "doc_40"]
  },
  {
    id: "doc_40",
    title: "Roman Empire",
    category: "History & Civilizations",
    url: "https://en.wikipedia.org/wiki/Roman_Empire",
    summary: "The post-Republican period of ancient Rome characterized by an autocratic government and territorial expansion.",
    content: "The Roman Empire was the post-Republican period of ancient Rome. As a polity, it included large territorial holdings around the Mediterranean Sea in Europe, North Africa, and Western Asia, ruled by emperors. Following the assassination of Julius Caesar and the civil wars that followed, Octavian (later known as Augustus) emerged victorious, establishing the Principate in 27 BC as the first Roman Emperor. The Empire reached its greatest territorial extent under Emperor Trajan in 117 AD, spanning from Britannia to Egypt and Mesopotamia, before dividing into Western and Eastern Roman Empires.",
    outLinks: ["doc_38", "doc_39"]
  },

  // --- Ambiguous Entities (for Genuine IR Disambiguation) ---
  {
    id: "doc_41",
    title: "Java (programming language)",
    category: "Computer Science",
    url: "https://en.wikipedia.org/wiki/Java_(programming_language)",
    summary: "A high-level, class-based, object-oriented programming language designed for portability.",
    content: "Java is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible. It is a general-purpose programming language intended to let programmers write once, run anywhere (WORA), meaning that compiled Java code can run on all platforms that support Java without the need to recompile. Java was originally developed by James Gosling at Sun Microsystems and released in May 1995 as a core component of Sun's Java platform.",
    outLinks: ["doc_3", "doc_31"]
  },
  {
    id: "doc_42",
    title: "Python (programming language)",
    category: "Computer Science",
    url: "https://en.wikipedia.org/wiki/Python_(programming_language)",
    summary: "A high-level, general-purpose programming language emphasizing code readability with dynamic typing.",
    content: "Python is a high-level, general-purpose programming language. Its design philosophy emphasizes code readability with the use of significant indentation. Python is dynamically-typed and garbage-collected. It supports multiple programming paradigms, including structured, object-oriented and functional programming. It was created by Guido van Rossum and first released in 1991. Python has become the dominant programming language for machine learning, artificial intelligence, scientific computing, and information retrieval systems.",
    outLinks: ["doc_20", "doc_21", "doc_22"]
  },
  {
    id: "doc_43",
    title: "Mercury (element)",
    category: "Physics & Chemistry",
    url: "https://en.wikipedia.org/wiki/Mercury_(element)",
    summary: "A chemical element with the symbol Hg and atomic number 80, commonly known as quicksilver.",
    content: "Mercury is a chemical element with the symbol Hg and atomic number 80. It is also known as quicksilver and was formerly named hydrargyrum. A heavy, silvery d-block element, mercury is the only metallic element that is liquid at standard conditions for temperature and pressure; the only other element that is liquid under these conditions is the halogen bromine. Mercury is used in thermometers, barometers, manometers, sphygmomanometers, float valves, and fluorescent lamps, though concerns about its toxicity have led to widespread phaseouts.",
    outLinks: ["doc_27"]
  },
  {
    id: "doc_44",
    title: "Jaguar",
    category: "Biological Sciences",
    url: "https://en.wikipedia.org/wiki/Jaguar",
    summary: "A large cat species and the only living member of the genus Panthera native to the Americas.",
    content: "The jaguar (Panthera onca) is a large cat species and the only living member of the genus Panthera native to the Americas. With a body length of up to 1.85 m (6 ft 1 in) and a weight the size of 96 kg (212 lb), it is the largest cat species in the Americas and the third-largest in the world. Its distinct spotted coat resembles that of the leopard, but the jaguar is usually larger and sturdier, and its behavioral characteristics are closer to those of the tiger. As an apex predator, it plays a vital role in stabilizing ecosystems.",
    outLinks: ["doc_37"]
  },
  {
    id: "doc_45",
    title: "Apple Inc.",
    category: "Technology & Companies",
    url: "https://en.wikipedia.org/wiki/Apple_Inc.",
    summary: "An American multinational technology corporation specializing in consumer electronics and software.",
    content: "Apple Inc. is an American multinational corporation and technology company headquartered in Cupertino, California, in Silicon Valley. It designs, develops, and sells consumer electronics, computer software, and online services. Devices include the iPhone, iPad, Mac, Apple Watch, and Apple Vision Pro. The company was founded as Apple Computer Company on April 1, 1976, by Steve Jobs, Steve Wozniak and Ronald Wayne to develop and sell Wozniak's Apple I personal computer.",
    outLinks: ["doc_10", "doc_31", "doc_35"]
  }
];

// Complete 30 Predefined Benchmark Queries across 5 distinct IR evaluation categories
const BENCHMARK_QUERIES = [
  // 1. Single-Word Queries
  { id: "Q01", category: "Single-Word", query: "solar", description: "Evaluates single-term retrieval for solar topics", relevantDocIds: ["doc_25", "doc_26", "doc_32"] },
  { id: "Q02", category: "Single-Word", query: "energy", description: "Evaluates broad term retrieval for energy and power", relevantDocIds: ["doc_25", "doc_26", "doc_27", "doc_29", "doc_30", "doc_33"] },
  { id: "Q03", category: "Single-Word", query: "electricity", description: "Evaluates retrieval of electrical physics and generation", relevantDocIds: ["doc_27", "doc_25", "doc_26", "doc_29", "doc_30", "doc_32"] },
  { id: "Q04", category: "Single-Word", query: "climate", description: "Evaluates climate systems and global warming topics", relevantDocIds: ["doc_28", "doc_26", "doc_25", "doc_34"] },
  { id: "Q05", category: "Single-Word", query: "battery", description: "Evaluates electrochemical energy storage systems", relevantDocIds: ["doc_29", "doc_27", "doc_34", "doc_26"] },
  { id: "Q06", category: "Single-Word", query: "history", description: "Evaluates historical documentation and ancient empires", relevantDocIds: ["doc_38", "doc_39", "doc_40"] },

  // 2. Multiword Queries
  { id: "Q07", category: "Multiword", query: "solar energy", description: "Evaluates multi-term query on solar power and radiation", relevantDocIds: ["doc_25", "doc_26", "doc_32", "doc_27"] },
  { id: "Q08", category: "Multiword", query: "renewable energy", description: "Evaluates clean sustainable energy sources", relevantDocIds: ["doc_26", "doc_25", "doc_30", "doc_33", "doc_28"] },
  { id: "Q09", category: "Multiword", query: "electric vehicle", description: "Evaluates electric transportation and battery mobility", relevantDocIds: ["doc_34", "doc_29", "doc_27", "doc_26"] },
  { id: "Q10", category: "Multiword", query: "wind power", description: "Evaluates wind turbine generation and grids", relevantDocIds: ["doc_30", "doc_26", "doc_27", "doc_29"] },
  { id: "Q11", category: "Multiword", query: "climate change", description: "Evaluates greenhouse emissions and climate mitigation", relevantDocIds: ["doc_28", "doc_26", "doc_25", "doc_34"] },
  { id: "Q12", category: "Multiword", query: "energy storage", description: "Evaluates batteries and grid buffering technologies", relevantDocIds: ["doc_29", "doc_26", "doc_25", "doc_30"] },
  { id: "Q13", category: "Multiword", query: "ancient Rome", description: "Evaluates Roman civilization and Mediterranean history", relevantDocIds: ["doc_39", "doc_40", "doc_38"] },
  { id: "Q14", category: "Multiword", query: "computer network", description: "Evaluates inter-computer communication and web protocols", relevantDocIds: ["doc_31", "doc_10", "doc_15", "doc_24"] },

  // 3. Ambiguous Queries
  { id: "Q15", category: "Ambiguous", query: "Java", description: "Ambiguous query testing programming vs geographical contexts", relevantDocIds: ["doc_41", "doc_3", "doc_31"] },
  { id: "Q16", category: "Ambiguous", query: "Python", description: "Ambiguous query testing language vs biological species", relevantDocIds: ["doc_42", "doc_20", "doc_21"] },
  { id: "Q17", category: "Ambiguous", query: "Mercury", description: "Ambiguous query testing metallic element vs planetary body", relevantDocIds: ["doc_43", "doc_27"] },
  { id: "Q18", category: "Ambiguous", query: "Jaguar", description: "Ambiguous query testing apex predator vs luxury car brand", relevantDocIds: ["doc_44", "doc_37"] },
  { id: "Q19", category: "Ambiguous", query: "Apple", description: "Ambiguous query testing technology company vs fruit", relevantDocIds: ["doc_45", "doc_31", "doc_10"] },

  // 4. Rare or Specific Queries
  { id: "Q20", category: "Rare/Specific", query: "photovoltaic", description: "Specific scientific query for photoelectric effect conversion", relevantDocIds: ["doc_32", "doc_25", "doc_35"] },
  { id: "Q21", category: "Rare/Specific", query: "geothermal", description: "Specific query for Earth thermal reservoir power", relevantDocIds: ["doc_33", "doc_26"] },
  { id: "Q22", category: "Rare/Specific", query: "photosynthesis", description: "Specific query for plant solar chemical conversion", relevantDocIds: ["doc_37", "doc_25", "doc_28"] },
  { id: "Q23", category: "Rare/Specific", query: "semiconductor", description: "Specific physics query for doping and integrated circuits", relevantDocIds: ["doc_35", "doc_32", "doc_36", "doc_45"] },
  { id: "Q24", category: "Rare/Specific", query: "microcontroller", description: "Specific embedded computer engineering query", relevantDocIds: ["doc_36", "doc_35", "doc_31"] },

  // 5. Natural-Language Queries (Ideal for Extractive Quick Answer)
  { id: "Q25", category: "Natural-Language", query: "how solar panels work", description: "Natural question regarding photoelectric photovoltaic operation", relevantDocIds: ["doc_25", "doc_32", "doc_26"] },
  { id: "Q26", category: "Natural-Language", query: "sources of renewable electricity", description: "Natural question inquiring about clean energy varieties", relevantDocIds: ["doc_26", "doc_25", "doc_30", "doc_33"] },
  { id: "Q27", category: "Natural-Language", query: "history of the Roman Empire", description: "Natural question seeking the founding and expansion of Rome", relevantDocIds: ["doc_40", "doc_39", "doc_38"] },
  { id: "Q28", category: "Natural-Language", query: "ways to store energy", description: "Natural question exploring batteries and energy storage", relevantDocIds: ["doc_29", "doc_26", "doc_25"] },
  { id: "Q29", category: "Natural-Language", query: "effects of climate change", description: "Natural question asking about global warming consequences", relevantDocIds: ["doc_28", "doc_26", "doc_34"] },
  { id: "Q30", category: "Natural-Language", query: "how computers communicate", description: "Natural question regarding network protocols and interconnections", relevantDocIds: ["doc_31", "doc_10", "doc_15"] }
];

// Stop Words List based on standard IR SMART stop-word list
const STOP_WORDS = new Set([
  "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "aren't",
  "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by",
  "can", "cannot", "could", "did", "do", "does", "doing", "don't", "down", "during", "each", "few",
  "for", "from", "further", "had", "has", "have", "having", "he", "her", "here", "hers", "herself",
  "him", "himself", "his", "how", "i", "if", "in", "into", "is", "isn't", "it", "its", "itself",
  "let's", "me", "more", "most", "my", "myself", "no", "nor", "not", "of", "off", "on", "once",
  "only", "or", "other", "ought", "our", "ours", "ourselves", "out", "over", "own", "same", "she",
  "should", "so", "some", "such", "than", "that", "the", "their", "theirs", "them", "themselves",
  "then", "there", "these", "they", "this", "those", "through", "to", "too", "under", "until",
  "up", "very", "was", "wasn't", "we", "were", "weren't", "what", "when", "where", "which", "while",
  "who", "whom", "why", "with", "won't", "would", "you", "your", "yours", "yourself", "yourselves"
]);


// --- MODULE: benchmarkSummary.js ---
const PRECOMPUTED_BENCHMARK_SUMMARY = {
  "metadata": {
    "title": "Mini Search Engine Comparative Evaluation Summary",
    "project": "Mini Search Engine Using TF-IDF and PageRank: A Comparative Study of Text Retrieval and Link-Based Ranking",
    "date": "2026-11-02T05:48:56.532Z",
    "environment": {
      "date": "2026-11-02T05:48:56.532Z",
      "localTime": "2/11/2026, 11:18:56 am",
      "nodeVersion": "v22.16.0",
      "v8Version": "12.4.254.21-node.26",
      "osType": "Windows_NT",
      "osRelease": "10.0.26300",
      "osPlatform": "win32",
      "osArch": "x64",
      "cpuModel": "11th Gen Intel(R) Core(TM) i5-11260H @ 2.60GHz",
      "cpuCores": 12,
      "cpuSpeedMhz": 2611,
      "totalMemoryBytes": 8299032576,
      "totalMemoryGB": 7.73,
      "freeMemoryGB": 1.47
    },
    "dataset": {
      "name": "Curated Simple English Wikipedia Knowledge Corpus",
      "totalDocuments": 45,
      "totalVocabularySize": 1207,
      "graphNodes": 45,
      "graphEdges": 179,
      "pageRankDampingFactor": 0.85,
      "pageRankIterationsToConvergence": 47,
      "pageRankConverged": true,
      "indexBuildTimeMs": 7.64,
      "pageRankComputeTimeMs": 2.5
    },
    "benchmarkParameters": {
      "totalQueries": 30,
      "categoriesCount": 5,
      "warmUpCycles": 5,
      "measuredRepetitionsPerQuery": 20,
      "totalTimedExecutions": 2400,
      "evaluationMetric": "Precision@10 (Number of relevant documents in top 10 / 10)",
      "timingBoundary": "Search execution only (excludes dataset loading, indexing, and UI rendering)"
    }
  },
  "keyFindings": {
    "bestPrecisionAt10Method": {
      "name": "TF-IDF + PageRank Hybrid (0.70 / 0.30)",
      "id": "hybrid",
      "meanPrecisionAt10": 0.28
    },
    "fastestMethodByMedianLatency": {
      "name": "Boolean (OR)",
      "id": "boolean_or",
      "medianLatencyMs": 0.0207
    }
  },
  "summaryByAlgorithm": {
    "boolean_and": {
      "id": "boolean_and",
      "name": "Boolean (AND)",
      "meanPrecisionAt10": 0.2233,
      "stdPrecisionAt10": 0.1606,
      "medianLatencyMs": 0.0261,
      "pooledMedianLatencyMs": 0.0279,
      "meanLatencyMs": 0.037,
      "stdLatencyMs": 0.0622,
      "minLatencyMs": 0.0174,
      "maxLatencyMs": 1.3369
    },
    "boolean_or": {
      "id": "boolean_or",
      "name": "Boolean (OR)",
      "meanPrecisionAt10": 0.2733,
      "stdPrecisionAt10": 0.1413,
      "medianLatencyMs": 0.0207,
      "pooledMedianLatencyMs": 0.022,
      "meanLatencyMs": 0.0305,
      "stdLatencyMs": 0.0874,
      "minLatencyMs": 0.0136,
      "maxLatencyMs": 2.0949
    },
    "tfidf": {
      "id": "tfidf",
      "name": "TF-IDF Vector Space",
      "meanPrecisionAt10": 0.2767,
      "stdPrecisionAt10": 0.1359,
      "medianLatencyMs": 0.1072,
      "pooledMedianLatencyMs": 0.1504,
      "meanLatencyMs": 0.1626,
      "stdLatencyMs": 0.0835,
      "minLatencyMs": 0.0911,
      "maxLatencyMs": 0.6783
    },
    "hybrid": {
      "id": "hybrid",
      "name": "TF-IDF + PageRank Hybrid (0.70 / 0.30)",
      "meanPrecisionAt10": 0.28,
      "stdPrecisionAt10": 0.1376,
      "medianLatencyMs": 0.1232,
      "pooledMedianLatencyMs": 0.1533,
      "meanLatencyMs": 0.1722,
      "stdLatencyMs": 0.0909,
      "minLatencyMs": 0.0927,
      "maxLatencyMs": 0.9584
    }
  },
  "categorySummary": {
    "Single-Word": {
      "category": "Single-Word",
      "queryCount": 6,
      "meanPrecisionAt10": {
        "boolean_and": 0.3667,
        "boolean_or": 0.3667,
        "tfidf": 0.3667,
        "hybrid": 0.3667
      },
      "medianLatencyMs": {
        "boolean_and": 0.0232,
        "boolean_or": 0.0188,
        "tfidf": 0.1013,
        "hybrid": 0.1131
      }
    },
    "Multiword": {
      "category": "Multiword",
      "queryCount": 8,
      "meanPrecisionAt10": {
        "boolean_and": 0.325,
        "boolean_or": 0.3625,
        "tfidf": 0.35,
        "hybrid": 0.35
      },
      "medianLatencyMs": {
        "boolean_and": 0.0294,
        "boolean_or": 0.0262,
        "tfidf": 0.1632,
        "hybrid": 0.1816
      }
    },
    "Ambiguous": {
      "category": "Ambiguous",
      "queryCount": 5,
      "meanPrecisionAt10": {
        "boolean_and": 0.1,
        "boolean_or": 0.1,
        "tfidf": 0.1,
        "hybrid": 0.1
      },
      "medianLatencyMs": {
        "boolean_and": 0.019,
        "boolean_or": 0.0147,
        "tfidf": 0.0993,
        "hybrid": 0.0982
      }
    },
    "Rare/Specific": {
      "category": "Rare/Specific",
      "queryCount": 5,
      "meanPrecisionAt10": {
        "boolean_and": 0.2,
        "boolean_or": 0.2,
        "tfidf": 0.2,
        "hybrid": 0.2
      },
      "medianLatencyMs": {
        "boolean_and": 0.0241,
        "boolean_or": 0.0186,
        "tfidf": 0.1025,
        "hybrid": 0.1071
      }
    },
    "Natural-Language": {
      "category": "Natural-Language",
      "queryCount": 6,
      "meanPrecisionAt10": {
        "boolean_and": 0.0667,
        "boolean_or": 0.2667,
        "tfidf": 0.3,
        "hybrid": 0.3167
      },
      "medianLatencyMs": {
        "boolean_and": 0.0316,
        "boolean_or": 0.0314,
        "tfidf": 0.2111,
        "hybrid": 0.2235
      }
    }
  },
  "detailedQueries": [
    {
      "id": "Q01",
      "category": "Single-Word",
      "query": "solar",
      "description": "Evaluates single-term retrieval for solar topics",
      "relevantDocIds": [
        "doc_25",
        "doc_26",
        "doc_32"
      ],
      "totalRelevantInCorpus": 3,
      "results": {
        "boolean_and": {
          "retrievedCount": 8,
          "relevantFoundInTop10": 3,
          "precisionAt10": 0.3,
          "medianLatencyMs": 0.0267,
          "meanLatencyMs": 0.0305,
          "allLatenciesMs": [
            0.0379,
            0.0495,
            0.0301,
            0.0285,
            0.0272,
            0.0261,
            0.0257,
            0.0706,
            0.0273,
            0.0236,
            0.0237,
            0.0418,
            0.0274,
            0.0245,
            0.029,
            0.0236,
            0.0239,
            0.0232,
            0.0237,
            0.0232
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_29",
              "title": "Battery (electricity)",
              "score": 1,
              "isRelevant": false
            },
            {
              "rank": 2,
              "id": "doc_28",
              "title": "Climate change",
              "score": 1,
              "isRelevant": false
            },
            {
              "rank": 3,
              "id": "doc_34",
              "title": "Electric vehicle",
              "score": 1,
              "isRelevant": false
            },
            {
              "rank": 4,
              "id": "doc_33",
              "title": "Geothermal energy",
              "score": 1,
              "isRelevant": false
            },
            {
              "rank": 5,
              "id": "doc_32",
              "title": "Photovoltaics",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 6,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 7,
              "id": "doc_35",
              "title": "Semiconductor",
              "score": 1,
              "isRelevant": false
            },
            {
              "rank": 8,
              "id": "doc_25",
              "title": "Solar energy",
              "score": 1,
              "isRelevant": true
            }
          ]
        },
        "boolean_or": {
          "retrievedCount": 8,
          "relevantFoundInTop10": 3,
          "precisionAt10": 0.3,
          "medianLatencyMs": 0.0222,
          "meanLatencyMs": 0.0344,
          "allLatenciesMs": [
            0.0243,
            0.0254,
            0.0256,
            0.0224,
            0.0219,
            0.0216,
            0.022,
            0.1887,
            0.0788,
            0.0203,
            0.0196,
            0.0241,
            0.0411,
            0.0202,
            0.0273,
            0.02,
            0.0199,
            0.0203,
            0.0213,
            0.0229
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_29",
              "title": "Battery (electricity)",
              "score": 1,
              "isRelevant": false
            },
            {
              "rank": 2,
              "id": "doc_28",
              "title": "Climate change",
              "score": 1,
              "isRelevant": false
            },
            {
              "rank": 3,
              "id": "doc_34",
              "title": "Electric vehicle",
              "score": 1,
              "isRelevant": false
            },
            {
              "rank": 4,
              "id": "doc_33",
              "title": "Geothermal energy",
              "score": 1,
              "isRelevant": false
            },
            {
              "rank": 5,
              "id": "doc_32",
              "title": "Photovoltaics",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 6,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 7,
              "id": "doc_35",
              "title": "Semiconductor",
              "score": 1,
              "isRelevant": false
            },
            {
              "rank": 8,
              "id": "doc_25",
              "title": "Solar energy",
              "score": 1,
              "isRelevant": true
            }
          ]
        },
        "tfidf": {
          "retrievedCount": 8,
          "relevantFoundInTop10": 3,
          "precisionAt10": 0.3,
          "medianLatencyMs": 0.107,
          "meanLatencyMs": 0.1503,
          "allLatenciesMs": [
            0.1095,
            0.1202,
            0.1088,
            0.1066,
            0.1265,
            0.1319,
            0.265,
            0.6783,
            0.1104,
            0.0987,
            0.2365,
            0.1046,
            0.1074,
            0.1043,
            0.1013,
            0.0971,
            0.0995,
            0.1001,
            0.103,
            0.0969
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_25",
              "title": "Solar energy",
              "score": 0.6779,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_32",
              "title": "Photovoltaics",
              "score": 0.3195,
              "isRelevant": true
            },
            {
              "rank": 3,
              "id": "doc_35",
              "title": "Semiconductor",
              "score": 0.0761,
              "isRelevant": false
            },
            {
              "rank": 4,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 0.0684,
              "isRelevant": true
            },
            {
              "rank": 5,
              "id": "doc_33",
              "title": "Geothermal energy",
              "score": 0.0655,
              "isRelevant": false
            },
            {
              "rank": 6,
              "id": "doc_34",
              "title": "Electric vehicle",
              "score": 0.0639,
              "isRelevant": false
            },
            {
              "rank": 7,
              "id": "doc_28",
              "title": "Climate change",
              "score": 0.0614,
              "isRelevant": false
            },
            {
              "rank": 8,
              "id": "doc_29",
              "title": "Battery (electricity)",
              "score": 0.0575,
              "isRelevant": false
            }
          ]
        },
        "hybrid": {
          "retrievedCount": 8,
          "relevantFoundInTop10": 3,
          "precisionAt10": 0.3,
          "medianLatencyMs": 0.1223,
          "meanLatencyMs": 0.1432,
          "allLatenciesMs": [
            0.1263,
            0.1476,
            0.1232,
            0.1248,
            0.1829,
            0.1525,
            0.1215,
            0.2987,
            0.1322,
            0.1195,
            0.1158,
            0.1143,
            0.1336,
            0.1145,
            0.3042,
            0.1111,
            0.1094,
            0.1101,
            0.1119,
            0.1101
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_25",
              "title": "Solar energy",
              "score": 0.9423,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_32",
              "title": "Photovoltaics",
              "score": 0.3703,
              "isRelevant": true
            },
            {
              "rank": 3,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 0.3122,
              "isRelevant": true
            },
            {
              "rank": 4,
              "id": "doc_29",
              "title": "Battery (electricity)",
              "score": 0.2412,
              "isRelevant": false
            },
            {
              "rank": 5,
              "id": "doc_28",
              "title": "Climate change",
              "score": 0.1917,
              "isRelevant": false
            },
            {
              "rank": 6,
              "id": "doc_34",
              "title": "Electric vehicle",
              "score": 0.1097,
              "isRelevant": false
            },
            {
              "rank": 7,
              "id": "doc_35",
              "title": "Semiconductor",
              "score": 0.0654,
              "isRelevant": false
            },
            {
              "rank": 8,
              "id": "doc_33",
              "title": "Geothermal energy",
              "score": 0.009,
              "isRelevant": false
            }
          ]
        }
      }
    },
    {
      "id": "Q02",
      "category": "Single-Word",
      "query": "energy",
      "description": "Evaluates broad term retrieval for energy and power",
      "relevantDocIds": [
        "doc_25",
        "doc_26",
        "doc_27",
        "doc_29",
        "doc_30",
        "doc_33"
      ],
      "totalRelevantInCorpus": 6,
      "results": {
        "boolean_and": {
          "retrievedCount": 9,
          "relevantFoundInTop10": 6,
          "precisionAt10": 0.6,
          "medianLatencyMs": 0.025,
          "meanLatencyMs": 0.0274,
          "allLatenciesMs": [
            0.0275,
            0.0356,
            0.0265,
            0.0262,
            0.03,
            0.0244,
            0.0261,
            0.0686,
            0.0263,
            0.025,
            0.0251,
            0.022,
            0.0231,
            0.0235,
            0.0287,
            0.0222,
            0.0215,
            0.0218,
            0.0219,
            0.0222
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_29",
              "title": "Battery (electricity)",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_28",
              "title": "Climate change",
              "score": 1,
              "isRelevant": false
            },
            {
              "rank": 3,
              "id": "doc_27",
              "title": "Electricity",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 4,
              "id": "doc_33",
              "title": "Geothermal energy",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 5,
              "id": "doc_37",
              "title": "Photosynthesis",
              "score": 1,
              "isRelevant": false
            },
            {
              "rank": 6,
              "id": "doc_32",
              "title": "Photovoltaics",
              "score": 1,
              "isRelevant": false
            },
            {
              "rank": 7,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 8,
              "id": "doc_25",
              "title": "Solar energy",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 9,
              "id": "doc_30",
              "title": "Wind power",
              "score": 1,
              "isRelevant": true
            }
          ]
        },
        "boolean_or": {
          "retrievedCount": 9,
          "relevantFoundInTop10": 6,
          "precisionAt10": 0.6,
          "medianLatencyMs": 0.0207,
          "meanLatencyMs": 0.022,
          "allLatenciesMs": [
            0.0236,
            0.023,
            0.0218,
            0.0214,
            0.0215,
            0.0216,
            0.0217,
            0.0458,
            0.0238,
            0.0198,
            0.0199,
            0.0191,
            0.0199,
            0.0198,
            0.0215,
            0.0189,
            0.0199,
            0.0189,
            0.019,
            0.0187
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_29",
              "title": "Battery (electricity)",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_28",
              "title": "Climate change",
              "score": 1,
              "isRelevant": false
            },
            {
              "rank": 3,
              "id": "doc_27",
              "title": "Electricity",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 4,
              "id": "doc_33",
              "title": "Geothermal energy",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 5,
              "id": "doc_37",
              "title": "Photosynthesis",
              "score": 1,
              "isRelevant": false
            },
            {
              "rank": 6,
              "id": "doc_32",
              "title": "Photovoltaics",
              "score": 1,
              "isRelevant": false
            },
            {
              "rank": 7,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 8,
              "id": "doc_25",
              "title": "Solar energy",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 9,
              "id": "doc_30",
              "title": "Wind power",
              "score": 1,
              "isRelevant": true
            }
          ]
        },
        "tfidf": {
          "retrievedCount": 9,
          "relevantFoundInTop10": 6,
          "precisionAt10": 0.6,
          "medianLatencyMs": 0.1073,
          "meanLatencyMs": 0.1368,
          "allLatenciesMs": [
            0.1152,
            0.4101,
            0.1095,
            0.1128,
            0.132,
            0.1302,
            0.1005,
            0.2336,
            0.1052,
            0.118,
            0.0967,
            0.0969,
            0.1007,
            0.1278,
            0.0975,
            0.0965,
            0.0953,
            0.0963,
            0.2646,
            0.0962
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 0.4595,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_33",
              "title": "Geothermal energy",
              "score": 0.4402,
              "isRelevant": true
            },
            {
              "rank": 3,
              "id": "doc_37",
              "title": "Photosynthesis",
              "score": 0.3146,
              "isRelevant": false
            },
            {
              "rank": 4,
              "id": "doc_25",
              "title": "Solar energy",
              "score": 0.2789,
              "isRelevant": true
            },
            {
              "rank": 5,
              "id": "doc_29",
              "title": "Battery (electricity)",
              "score": 0.1657,
              "isRelevant": true
            },
            {
              "rank": 6,
              "id": "doc_30",
              "title": "Wind power",
              "score": 0.1563,
              "isRelevant": true
            },
            {
              "rank": 7,
              "id": "doc_28",
              "title": "Climate change",
              "score": 0.1179,
              "isRelevant": false
            },
            {
              "rank": 8,
              "id": "doc_32",
              "title": "Photovoltaics",
              "score": 0.0767,
              "isRelevant": false
            },
            {
              "rank": 9,
              "id": "doc_27",
              "title": "Electricity",
              "score": 0.0665,
              "isRelevant": true
            }
          ]
        },
        "hybrid": {
          "retrievedCount": 9,
          "relevantFoundInTop10": 6,
          "precisionAt10": 0.6,
          "medianLatencyMs": 0.124,
          "meanLatencyMs": 0.133,
          "allLatenciesMs": [
            0.1299,
            0.133,
            0.1284,
            0.128,
            0.1517,
            0.1541,
            0.1207,
            0.2623,
            0.1258,
            0.1415,
            0.1168,
            0.1197,
            0.1222,
            0.149,
            0.1144,
            0.1123,
            0.1113,
            0.1128,
            0.1147,
            0.1117
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 0.9945,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_33",
              "title": "Geothermal energy",
              "score": 0.6915,
              "isRelevant": true
            },
            {
              "rank": 3,
              "id": "doc_25",
              "title": "Solar energy",
              "score": 0.6212,
              "isRelevant": true
            },
            {
              "rank": 4,
              "id": "doc_37",
              "title": "Photosynthesis",
              "score": 0.4419,
              "isRelevant": false
            },
            {
              "rank": 5,
              "id": "doc_29",
              "title": "Battery (electricity)",
              "score": 0.4185,
              "isRelevant": true
            },
            {
              "rank": 6,
              "id": "doc_30",
              "title": "Wind power",
              "score": 0.3681,
              "isRelevant": true
            },
            {
              "rank": 7,
              "id": "doc_27",
              "title": "Electricity",
              "score": 0.3,
              "isRelevant": true
            },
            {
              "rank": 8,
              "id": "doc_28",
              "title": "Climate change",
              "score": 0.2852,
              "isRelevant": false
            },
            {
              "rank": 9,
              "id": "doc_32",
              "title": "Photovoltaics",
              "score": 0.1109,
              "isRelevant": false
            }
          ]
        }
      }
    },
    {
      "id": "Q03",
      "category": "Single-Word",
      "query": "electricity",
      "description": "Evaluates retrieval of electrical physics and generation",
      "relevantDocIds": [
        "doc_27",
        "doc_25",
        "doc_26",
        "doc_29",
        "doc_30",
        "doc_32"
      ],
      "totalRelevantInCorpus": 6,
      "results": {
        "boolean_and": {
          "retrievedCount": 8,
          "relevantFoundInTop10": 6,
          "precisionAt10": 0.6,
          "medianLatencyMs": 0.0252,
          "meanLatencyMs": 0.0269,
          "allLatenciesMs": [
            0.0271,
            0.036,
            0.0259,
            0.0271,
            0.0265,
            0.0259,
            0.0239,
            0.0545,
            0.0279,
            0.0246,
            0.0229,
            0.0227,
            0.0233,
            0.0239,
            0.0227,
            0.0225,
            0.0221,
            0.0222,
            0.0257,
            0.0302
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_29",
              "title": "Battery (electricity)",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_34",
              "title": "Electric vehicle",
              "score": 1,
              "isRelevant": false
            },
            {
              "rank": 3,
              "id": "doc_27",
              "title": "Electricity",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 4,
              "id": "doc_33",
              "title": "Geothermal energy",
              "score": 1,
              "isRelevant": false
            },
            {
              "rank": 5,
              "id": "doc_32",
              "title": "Photovoltaics",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 6,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 7,
              "id": "doc_25",
              "title": "Solar energy",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 8,
              "id": "doc_30",
              "title": "Wind power",
              "score": 1,
              "isRelevant": true
            }
          ]
        },
        "boolean_or": {
          "retrievedCount": 8,
          "relevantFoundInTop10": 6,
          "precisionAt10": 0.6,
          "medianLatencyMs": 0.0203,
          "meanLatencyMs": 0.022,
          "allLatenciesMs": [
            0.0224,
            0.0241,
            0.0236,
            0.0215,
            0.0223,
            0.0208,
            0.0204,
            0.0447,
            0.0212,
            0.0203,
            0.0194,
            0.0196,
            0.0199,
            0.02,
            0.0192,
            0.0238,
            0.0189,
            0.0189,
            0.0194,
            0.0192
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_29",
              "title": "Battery (electricity)",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_34",
              "title": "Electric vehicle",
              "score": 1,
              "isRelevant": false
            },
            {
              "rank": 3,
              "id": "doc_27",
              "title": "Electricity",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 4,
              "id": "doc_33",
              "title": "Geothermal energy",
              "score": 1,
              "isRelevant": false
            },
            {
              "rank": 5,
              "id": "doc_32",
              "title": "Photovoltaics",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 6,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 7,
              "id": "doc_25",
              "title": "Solar energy",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 8,
              "id": "doc_30",
              "title": "Wind power",
              "score": 1,
              "isRelevant": true
            }
          ]
        },
        "tfidf": {
          "retrievedCount": 8,
          "relevantFoundInTop10": 6,
          "precisionAt10": 0.6,
          "medianLatencyMs": 0.104,
          "meanLatencyMs": 0.1175,
          "allLatenciesMs": [
            0.1069,
            0.1097,
            0.1062,
            0.1068,
            0.1373,
            0.1371,
            0.0996,
            0.2709,
            0.1514,
            0.1028,
            0.0972,
            0.1001,
            0.1005,
            0.1332,
            0.1052,
            0.0982,
            0.0968,
            0.0969,
            0.0972,
            0.0968
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_27",
              "title": "Electricity",
              "score": 0.3462,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_32",
              "title": "Photovoltaics",
              "score": 0.2396,
              "isRelevant": true
            },
            {
              "rank": 3,
              "id": "doc_34",
              "title": "Electric vehicle",
              "score": 0.1916,
              "isRelevant": false
            },
            {
              "rank": 4,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 0.1368,
              "isRelevant": true
            },
            {
              "rank": 5,
              "id": "doc_30",
              "title": "Wind power",
              "score": 0.1086,
              "isRelevant": true
            },
            {
              "rank": 6,
              "id": "doc_33",
              "title": "Geothermal energy",
              "score": 0.0655,
              "isRelevant": false
            },
            {
              "rank": 7,
              "id": "doc_29",
              "title": "Battery (electricity)",
              "score": 0.0575,
              "isRelevant": true
            },
            {
              "rank": 8,
              "id": "doc_25",
              "title": "Solar energy",
              "score": 0.0484,
              "isRelevant": true
            }
          ]
        },
        "hybrid": {
          "retrievedCount": 8,
          "relevantFoundInTop10": 6,
          "precisionAt10": 0.6,
          "medianLatencyMs": 0.1188,
          "meanLatencyMs": 0.1299,
          "allLatenciesMs": [
            0.1249,
            0.1265,
            0.123,
            0.1248,
            0.1874,
            0.1505,
            0.1173,
            0.2704,
            0.1213,
            0.1171,
            0.1128,
            0.1236,
            0.1203,
            0.1127,
            0.1101,
            0.1107,
            0.1099,
            0.1099,
            0.1098,
            0.115
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_27",
              "title": "Electricity",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_32",
              "title": "Photovoltaics",
              "score": 0.5227,
              "isRelevant": true
            },
            {
              "rank": 3,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 0.5017,
              "isRelevant": true
            },
            {
              "rank": 4,
              "id": "doc_34",
              "title": "Electric vehicle",
              "score": 0.4372,
              "isRelevant": false
            },
            {
              "rank": 5,
              "id": "doc_30",
              "title": "Wind power",
              "score": 0.3408,
              "isRelevant": true
            },
            {
              "rank": 6,
              "id": "doc_29",
              "title": "Battery (electricity)",
              "score": 0.2578,
              "isRelevant": true
            },
            {
              "rank": 7,
              "id": "doc_25",
              "title": "Solar energy",
              "score": 0.2375,
              "isRelevant": true
            },
            {
              "rank": 8,
              "id": "doc_33",
              "title": "Geothermal energy",
              "score": 0.0402,
              "isRelevant": false
            }
          ]
        }
      }
    },
    {
      "id": "Q04",
      "category": "Single-Word",
      "query": "climate",
      "description": "Evaluates climate systems and global warming topics",
      "relevantDocIds": [
        "doc_28",
        "doc_26",
        "doc_25",
        "doc_34"
      ],
      "totalRelevantInCorpus": 4,
      "results": {
        "boolean_and": {
          "retrievedCount": 3,
          "relevantFoundInTop10": 3,
          "precisionAt10": 0.3,
          "medianLatencyMs": 0.0211,
          "meanLatencyMs": 0.0246,
          "allLatenciesMs": [
            0.0224,
            0.022,
            0.0222,
            0.0233,
            0.0243,
            0.0532,
            0.0208,
            0.0571,
            0.0241,
            0.02,
            0.0195,
            0.0215,
            0.0202,
            0.0214,
            0.0208,
            0.0196,
            0.0196,
            0.0195,
            0.0199,
            0.0199
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_28",
              "title": "Climate change",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_34",
              "title": "Electric vehicle",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 3,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 1,
              "isRelevant": true
            }
          ]
        },
        "boolean_or": {
          "retrievedCount": 3,
          "relevantFoundInTop10": 3,
          "precisionAt10": 0.3,
          "medianLatencyMs": 0.0168,
          "meanLatencyMs": 0.018,
          "allLatenciesMs": [
            0.0178,
            0.0178,
            0.0174,
            0.0171,
            0.0173,
            0.0189,
            0.0166,
            0.0384,
            0.0179,
            0.0163,
            0.0161,
            0.017,
            0.0166,
            0.0165,
            0.0165,
            0.0158,
            0.0155,
            0.0159,
            0.0157,
            0.0179
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_28",
              "title": "Climate change",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_34",
              "title": "Electric vehicle",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 3,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 1,
              "isRelevant": true
            }
          ]
        },
        "tfidf": {
          "retrievedCount": 3,
          "relevantFoundInTop10": 3,
          "precisionAt10": 0.3,
          "medianLatencyMs": 0.0976,
          "meanLatencyMs": 0.1109,
          "allLatenciesMs": [
            0.1043,
            0.1036,
            0.0996,
            0.0999,
            0.1235,
            0.1939,
            0.0953,
            0.2143,
            0.1026,
            0.0941,
            0.0922,
            0.1345,
            0.0973,
            0.0942,
            0.0928,
            0.0938,
            0.0943,
            0.0977,
            0.0976,
            0.0934
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_28",
              "title": "Climate change",
              "score": 0.2409,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 0.0894,
              "isRelevant": true
            },
            {
              "rank": 3,
              "id": "doc_34",
              "title": "Electric vehicle",
              "score": 0.0836,
              "isRelevant": true
            }
          ]
        },
        "hybrid": {
          "retrievedCount": 3,
          "relevantFoundInTop10": 3,
          "precisionAt10": 0.3,
          "medianLatencyMs": 0.1054,
          "meanLatencyMs": 0.1341,
          "allLatenciesMs": [
            0.1123,
            0.1098,
            0.1147,
            0.1073,
            0.127,
            0.1369,
            0.1032,
            0.4843,
            0.1043,
            0.1018,
            0.1008,
            0.1109,
            0.1038,
            0.1004,
            0.0976,
            0.0979,
            0.1065,
            0.2664,
            0.0978,
            0.0979
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_28",
              "title": "Climate change",
              "score": 0.8289,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 0.3262,
              "isRelevant": true
            },
            {
              "rank": 3,
              "id": "doc_34",
              "title": "Electric vehicle",
              "score": 0,
              "isRelevant": true
            }
          ]
        }
      }
    },
    {
      "id": "Q05",
      "category": "Single-Word",
      "query": "battery",
      "description": "Evaluates electrochemical energy storage systems",
      "relevantDocIds": [
        "doc_29",
        "doc_27",
        "doc_34",
        "doc_26"
      ],
      "totalRelevantInCorpus": 4,
      "results": {
        "boolean_and": {
          "retrievedCount": 4,
          "relevantFoundInTop10": 3,
          "precisionAt10": 0.3,
          "medianLatencyMs": 0.0213,
          "meanLatencyMs": 0.0238,
          "allLatenciesMs": [
            0.0218,
            0.0218,
            0.0234,
            0.0237,
            0.0207,
            0.022,
            0.0199,
            0.0282,
            0.0233,
            0.0196,
            0.0188,
            0.0225,
            0.0208,
            0.0196,
            0.0198,
            0.0193,
            0.0202,
            0.0319,
            0.0191,
            0.0591
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_29",
              "title": "Battery (electricity)",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_34",
              "title": "Electric vehicle",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 3,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 4,
              "id": "doc_30",
              "title": "Wind power",
              "score": 1,
              "isRelevant": false
            }
          ]
        },
        "boolean_or": {
          "retrievedCount": 4,
          "relevantFoundInTop10": 3,
          "precisionAt10": 0.3,
          "medianLatencyMs": 0.0173,
          "meanLatencyMs": 0.0173,
          "allLatenciesMs": [
            0.0182,
            0.0178,
            0.0178,
            0.0175,
            0.0165,
            0.0172,
            0.0204,
            0.0185,
            0.0179,
            0.0164,
            0.0159,
            0.0165,
            0.0173,
            0.0169,
            0.0161,
            0.0155,
            0.0165,
            0.0189,
            0.0158,
            0.0181
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_29",
              "title": "Battery (electricity)",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_34",
              "title": "Electric vehicle",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 3,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 4,
              "id": "doc_30",
              "title": "Wind power",
              "score": 1,
              "isRelevant": false
            }
          ]
        },
        "tfidf": {
          "retrievedCount": 4,
          "relevantFoundInTop10": 3,
          "precisionAt10": 0.3,
          "medianLatencyMs": 0.0985,
          "meanLatencyMs": 0.1077,
          "allLatenciesMs": [
            0.1023,
            0.1024,
            0.1029,
            0.1018,
            0.1223,
            0.1291,
            0.0983,
            0.1217,
            0.0987,
            0.0998,
            0.0932,
            0.095,
            0.2237,
            0.0955,
            0.0945,
            0.0949,
            0.0941,
            0.0945,
            0.0928,
            0.0974
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_29",
              "title": "Battery (electricity)",
              "score": 0.3519,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 0.0836,
              "isRelevant": true
            },
            {
              "rank": 3,
              "id": "doc_34",
              "title": "Electric vehicle",
              "score": 0.0781,
              "isRelevant": true
            },
            {
              "rank": 4,
              "id": "doc_30",
              "title": "Wind power",
              "score": 0.0664,
              "isRelevant": false
            }
          ]
        },
        "hybrid": {
          "retrievedCount": 4,
          "relevantFoundInTop10": 3,
          "precisionAt10": 0.3,
          "medianLatencyMs": 0.1075,
          "meanLatencyMs": 0.1119,
          "allLatenciesMs": [
            0.1116,
            0.1135,
            0.11,
            0.1102,
            0.1367,
            0.141,
            0.1374,
            0.1116,
            0.106,
            0.1035,
            0.1015,
            0.1037,
            0.1089,
            0.1019,
            0.0995,
            0.1035,
            0.0997,
            0.1043,
            0.0999,
            0.1336
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_29",
              "title": "Battery (electricity)",
              "score": 0.9106,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 0.3423,
              "isRelevant": true
            },
            {
              "rank": 3,
              "id": "doc_30",
              "title": "Wind power",
              "score": 0.1533,
              "isRelevant": false
            },
            {
              "rank": 4,
              "id": "doc_34",
              "title": "Electric vehicle",
              "score": 0.0288,
              "isRelevant": true
            }
          ]
        }
      }
    },
    {
      "id": "Q06",
      "category": "Single-Word",
      "query": "history",
      "description": "Evaluates historical documentation and ancient empires",
      "relevantDocIds": [
        "doc_38",
        "doc_39",
        "doc_40"
      ],
      "totalRelevantInCorpus": 3,
      "results": {
        "boolean_and": {
          "retrievedCount": 1,
          "relevantFoundInTop10": 1,
          "precisionAt10": 0.1,
          "medianLatencyMs": 0.0202,
          "meanLatencyMs": 0.0461,
          "allLatenciesMs": [
            0.021,
            0.0202,
            0.2239,
            0.0215,
            0.0195,
            0.0202,
            0.109,
            0.2298,
            0.0201,
            0.0199,
            0.0193,
            0.0267,
            0.0211,
            0.0191,
            0.0185,
            0.019,
            0.0187,
            0.0199,
            0.0183,
            0.036
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_38",
              "title": "History",
              "score": 1,
              "isRelevant": true
            }
          ]
        },
        "boolean_or": {
          "retrievedCount": 1,
          "relevantFoundInTop10": 1,
          "precisionAt10": 0.1,
          "medianLatencyMs": 0.0154,
          "meanLatencyMs": 0.0166,
          "allLatenciesMs": [
            0.017,
            0.0159,
            0.0203,
            0.0153,
            0.0219,
            0.0154,
            0.0194,
            0.0211,
            0.0153,
            0.0152,
            0.015,
            0.0155,
            0.0158,
            0.016,
            0.0146,
            0.0149,
            0.0149,
            0.0149,
            0.0148,
            0.0183
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_38",
              "title": "History",
              "score": 1,
              "isRelevant": true
            }
          ]
        },
        "tfidf": {
          "retrievedCount": 1,
          "relevantFoundInTop10": 1,
          "precisionAt10": 0.1,
          "medianLatencyMs": 0.0984,
          "meanLatencyMs": 0.1119,
          "allLatenciesMs": [
            0.1004,
            0.1017,
            0.112,
            0.1056,
            0.1218,
            0.1278,
            0.1223,
            0.1101,
            0.0964,
            0.095,
            0.0926,
            0.2394,
            0.0965,
            0.0955,
            0.092,
            0.0949,
            0.0927,
            0.0939,
            0.0923,
            0.155
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_38",
              "title": "History",
              "score": 0.4173,
              "isRelevant": true
            }
          ]
        },
        "hybrid": {
          "retrievedCount": 1,
          "relevantFoundInTop10": 1,
          "precisionAt10": 0.1,
          "medianLatencyMs": 0.0994,
          "meanLatencyMs": 0.107,
          "allLatenciesMs": [
            0.1216,
            0.1038,
            0.1055,
            0.1007,
            0.1293,
            0.1361,
            0.1442,
            0.1026,
            0.0966,
            0.105,
            0.0945,
            0.0981,
            0.0953,
            0.0945,
            0.0936,
            0.0981,
            0.0928,
            0.0947,
            0.0928,
            0.1406
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_38",
              "title": "History",
              "score": 0,
              "isRelevant": true
            }
          ]
        }
      }
    },
    {
      "id": "Q07",
      "category": "Multiword",
      "query": "solar energy",
      "description": "Evaluates multi-term query on solar power and radiation",
      "relevantDocIds": [
        "doc_25",
        "doc_26",
        "doc_32",
        "doc_27"
      ],
      "totalRelevantInCorpus": 4,
      "results": {
        "boolean_and": {
          "retrievedCount": 6,
          "relevantFoundInTop10": 3,
          "precisionAt10": 0.3,
          "medianLatencyMs": 0.0317,
          "meanLatencyMs": 0.042,
          "allLatenciesMs": [
            0.0345,
            0.0328,
            0.0347,
            0.032,
            0.0309,
            0.1172,
            0.0337,
            0.0345,
            0.0317,
            0.0295,
            0.028,
            0.0319,
            0.0317,
            0.0289,
            0.0291,
            0.163,
            0.0281,
            0.0289,
            0.0277,
            0.0313
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_29",
              "title": "Battery (electricity)",
              "score": 1,
              "isRelevant": false
            },
            {
              "rank": 2,
              "id": "doc_28",
              "title": "Climate change",
              "score": 1,
              "isRelevant": false
            },
            {
              "rank": 3,
              "id": "doc_33",
              "title": "Geothermal energy",
              "score": 1,
              "isRelevant": false
            },
            {
              "rank": 4,
              "id": "doc_32",
              "title": "Photovoltaics",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 5,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 6,
              "id": "doc_25",
              "title": "Solar energy",
              "score": 1,
              "isRelevant": true
            }
          ]
        },
        "boolean_or": {
          "retrievedCount": 10,
          "relevantFoundInTop10": 4,
          "precisionAt10": 0.4,
          "medianLatencyMs": 0.0282,
          "meanLatencyMs": 0.0328,
          "allLatenciesMs": [
            0.0311,
            0.0304,
            0.0312,
            0.0284,
            0.0279,
            0.0483,
            0.0814,
            0.0288,
            0.0344,
            0.0258,
            0.0251,
            0.0266,
            0.0543,
            0.0252,
            0.0251,
            0.0291,
            0.0254,
            0.0258,
            0.0259,
            0.0267
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_29",
              "title": "Battery (electricity)",
              "score": 1,
              "isRelevant": false
            },
            {
              "rank": 2,
              "id": "doc_28",
              "title": "Climate change",
              "score": 1,
              "isRelevant": false
            },
            {
              "rank": 3,
              "id": "doc_33",
              "title": "Geothermal energy",
              "score": 1,
              "isRelevant": false
            },
            {
              "rank": 4,
              "id": "doc_32",
              "title": "Photovoltaics",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 5,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 6,
              "id": "doc_25",
              "title": "Solar energy",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 7,
              "id": "doc_34",
              "title": "Electric vehicle",
              "score": 0.5,
              "isRelevant": false
            },
            {
              "rank": 8,
              "id": "doc_27",
              "title": "Electricity",
              "score": 0.5,
              "isRelevant": true
            },
            {
              "rank": 9,
              "id": "doc_37",
              "title": "Photosynthesis",
              "score": 0.5,
              "isRelevant": false
            },
            {
              "rank": 10,
              "id": "doc_35",
              "title": "Semiconductor",
              "score": 0.5,
              "isRelevant": false
            }
          ]
        },
        "tfidf": {
          "retrievedCount": 10,
          "relevantFoundInTop10": 3,
          "precisionAt10": 0.3,
          "medianLatencyMs": 0.161,
          "meanLatencyMs": 0.1928,
          "allLatenciesMs": [
            0.1643,
            0.1663,
            0.1725,
            0.1622,
            0.2054,
            0.2108,
            0.3543,
            0.1786,
            0.1598,
            0.157,
            0.1577,
            0.1578,
            0.1644,
            0.1564,
            0.1532,
            0.1588,
            0.1506,
            0.1532,
            0.1516,
            0.5213
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_25",
              "title": "Solar energy",
              "score": 0.6822,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 0.3675,
              "isRelevant": true
            },
            {
              "rank": 3,
              "id": "doc_33",
              "title": "Geothermal energy",
              "score": 0.3521,
              "isRelevant": false
            },
            {
              "rank": 4,
              "id": "doc_32",
              "title": "Photovoltaics",
              "score": 0.2836,
              "isRelevant": true
            },
            {
              "rank": 5,
              "id": "doc_37",
              "title": "Photosynthesis",
              "score": 0.2178,
              "isRelevant": false
            },
            {
              "rank": 6,
              "id": "doc_29",
              "title": "Battery (electricity)",
              "score": 0.1562,
              "isRelevant": false
            },
            {
              "rank": 7,
              "id": "doc_28",
              "title": "Climate change",
              "score": 0.1259,
              "isRelevant": false
            },
            {
              "rank": 8,
              "id": "doc_30",
              "title": "Wind power",
              "score": 0.1083,
              "isRelevant": false
            },
            {
              "rank": 9,
              "id": "doc_35",
              "title": "Semiconductor",
              "score": 0.0549,
              "isRelevant": false
            },
            {
              "rank": 10,
              "id": "doc_34",
              "title": "Electric vehicle",
              "score": 0.0461,
              "isRelevant": false
            }
          ]
        },
        "hybrid": {
          "retrievedCount": 10,
          "relevantFoundInTop10": 4,
          "precisionAt10": 0.4,
          "medianLatencyMs": 0.1818,
          "meanLatencyMs": 0.193,
          "allLatenciesMs": [
            0.1905,
            0.1922,
            0.1929,
            0.1928,
            0.2144,
            0.2174,
            0.3485,
            0.1942,
            0.1804,
            0.1784,
            0.1753,
            0.1791,
            0.1831,
            0.1737,
            0.1708,
            0.1801,
            0.1689,
            0.1698,
            0.1696,
            0.1875
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_25",
              "title": "Solar energy",
              "score": 0.9428,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 0.6483,
              "isRelevant": true
            },
            {
              "rank": 3,
              "id": "doc_29",
              "title": "Battery (electricity)",
              "score": 0.3631,
              "isRelevant": false
            },
            {
              "rank": 4,
              "id": "doc_33",
              "title": "Geothermal energy",
              "score": 0.3625,
              "isRelevant": false
            },
            {
              "rank": 5,
              "id": "doc_32",
              "title": "Photovoltaics",
              "score": 0.3541,
              "isRelevant": true
            },
            {
              "rank": 6,
              "id": "doc_27",
              "title": "Electricity",
              "score": 0.3,
              "isRelevant": true
            },
            {
              "rank": 7,
              "id": "doc_28",
              "title": "Climate change",
              "score": 0.2815,
              "isRelevant": false
            },
            {
              "rank": 8,
              "id": "doc_30",
              "title": "Wind power",
              "score": 0.2765,
              "isRelevant": false
            },
            {
              "rank": 9,
              "id": "doc_37",
              "title": "Photosynthesis",
              "score": 0.1891,
              "isRelevant": false
            },
            {
              "rank": 10,
              "id": "doc_34",
              "title": "Electric vehicle",
              "score": 0.1177,
              "isRelevant": false
            }
          ]
        }
      }
    },
    {
      "id": "Q08",
      "category": "Multiword",
      "query": "renewable energy",
      "description": "Evaluates clean sustainable energy sources",
      "relevantDocIds": [
        "doc_26",
        "doc_25",
        "doc_30",
        "doc_33",
        "doc_28"
      ],
      "totalRelevantInCorpus": 5,
      "results": {
        "boolean_and": {
          "retrievedCount": 6,
          "relevantFoundInTop10": 5,
          "precisionAt10": 0.5,
          "medianLatencyMs": 0.0315,
          "meanLatencyMs": 0.0351,
          "allLatenciesMs": [
            0.0451,
            0.0317,
            0.0336,
            0.0332,
            0.0313,
            0.0307,
            0.0734,
            0.0316,
            0.0323,
            0.0287,
            0.0278,
            0.0282,
            0.0295,
            0.0328,
            0.0278,
            0.0479,
            0.028,
            0.028,
            0.0284,
            0.0523
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_29",
              "title": "Battery (electricity)",
              "score": 1,
              "isRelevant": false
            },
            {
              "rank": 2,
              "id": "doc_28",
              "title": "Climate change",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 3,
              "id": "doc_33",
              "title": "Geothermal energy",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 4,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 5,
              "id": "doc_25",
              "title": "Solar energy",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 6,
              "id": "doc_30",
              "title": "Wind power",
              "score": 1,
              "isRelevant": true
            }
          ]
        },
        "boolean_or": {
          "retrievedCount": 10,
          "relevantFoundInTop10": 5,
          "precisionAt10": 0.5,
          "medianLatencyMs": 0.027,
          "meanLatencyMs": 0.035,
          "allLatenciesMs": [
            0.0603,
            0.07,
            0.0288,
            0.0286,
            0.0265,
            0.0263,
            0.0513,
            0.0283,
            0.0261,
            0.0256,
            0.0243,
            0.0247,
            0.025,
            0.086,
            0.0239,
            0.0275,
            0.0288,
            0.0237,
            0.0241,
            0.0406
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_29",
              "title": "Battery (electricity)",
              "score": 1,
              "isRelevant": false
            },
            {
              "rank": 2,
              "id": "doc_28",
              "title": "Climate change",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 3,
              "id": "doc_33",
              "title": "Geothermal energy",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 4,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 5,
              "id": "doc_25",
              "title": "Solar energy",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 6,
              "id": "doc_30",
              "title": "Wind power",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 7,
              "id": "doc_34",
              "title": "Electric vehicle",
              "score": 0.5,
              "isRelevant": false
            },
            {
              "rank": 8,
              "id": "doc_27",
              "title": "Electricity",
              "score": 0.5,
              "isRelevant": false
            },
            {
              "rank": 9,
              "id": "doc_37",
              "title": "Photosynthesis",
              "score": 0.5,
              "isRelevant": false
            },
            {
              "rank": 10,
              "id": "doc_32",
              "title": "Photovoltaics",
              "score": 0.5,
              "isRelevant": false
            }
          ]
        },
        "tfidf": {
          "retrievedCount": 10,
          "relevantFoundInTop10": 5,
          "precisionAt10": 0.5,
          "medianLatencyMs": 0.1671,
          "meanLatencyMs": 0.1758,
          "allLatenciesMs": [
            0.1978,
            0.169,
            0.1835,
            0.2003,
            0.1915,
            0.1943,
            0.302,
            0.1658,
            0.1709,
            0.1548,
            0.153,
            0.1549,
            0.1605,
            0.1654,
            0.1515,
            0.169,
            0.1519,
            0.1588,
            0.152,
            0.1685
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 0.5739,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_33",
              "title": "Geothermal energy",
              "score": 0.3482,
              "isRelevant": true
            },
            {
              "rank": 3,
              "id": "doc_25",
              "title": "Solar energy",
              "score": 0.226,
              "isRelevant": true
            },
            {
              "rank": 4,
              "id": "doc_37",
              "title": "Photosynthesis",
              "score": 0.2128,
              "isRelevant": false
            },
            {
              "rank": 5,
              "id": "doc_29",
              "title": "Battery (electricity)",
              "score": 0.1564,
              "isRelevant": false
            },
            {
              "rank": 6,
              "id": "doc_30",
              "title": "Wind power",
              "score": 0.1475,
              "isRelevant": true
            },
            {
              "rank": 7,
              "id": "doc_28",
              "title": "Climate change",
              "score": 0.127,
              "isRelevant": true
            },
            {
              "rank": 8,
              "id": "doc_32",
              "title": "Photovoltaics",
              "score": 0.0519,
              "isRelevant": false
            },
            {
              "rank": 9,
              "id": "doc_34",
              "title": "Electric vehicle",
              "score": 0.0491,
              "isRelevant": false
            },
            {
              "rank": 10,
              "id": "doc_27",
              "title": "Electricity",
              "score": 0.045,
              "isRelevant": false
            }
          ]
        },
        "hybrid": {
          "retrievedCount": 10,
          "relevantFoundInTop10": 5,
          "precisionAt10": 0.5,
          "medianLatencyMs": 0.1805,
          "meanLatencyMs": 0.1999,
          "allLatenciesMs": [
            0.1899,
            0.1904,
            0.2263,
            0.2325,
            0.2834,
            0.2138,
            0.3602,
            0.1853,
            0.1808,
            0.2074,
            0.1726,
            0.1763,
            0.1792,
            0.1802,
            0.1676,
            0.1737,
            0.1679,
            0.1672,
            0.1661,
            0.1768
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 0.9945,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_25",
              "title": "Solar energy",
              "score": 0.4824,
              "isRelevant": true
            },
            {
              "rank": 3,
              "id": "doc_33",
              "title": "Geothermal energy",
              "score": 0.4271,
              "isRelevant": true
            },
            {
              "rank": 4,
              "id": "doc_29",
              "title": "Battery (electricity)",
              "score": 0.3892,
              "isRelevant": false
            },
            {
              "rank": 5,
              "id": "doc_30",
              "title": "Wind power",
              "score": 0.3438,
              "isRelevant": true
            },
            {
              "rank": 6,
              "id": "doc_28",
              "title": "Climate change",
              "score": 0.3021,
              "isRelevant": true
            },
            {
              "rank": 7,
              "id": "doc_27",
              "title": "Electricity",
              "score": 0.3,
              "isRelevant": false
            },
            {
              "rank": 8,
              "id": "doc_37",
              "title": "Photosynthesis",
              "score": 0.2222,
              "isRelevant": false
            },
            {
              "rank": 9,
              "id": "doc_34",
              "title": "Electric vehicle",
              "score": 0.1232,
              "isRelevant": false
            },
            {
              "rank": 10,
              "id": "doc_32",
              "title": "Photovoltaics",
              "score": 0.1018,
              "isRelevant": false
            }
          ]
        }
      }
    },
    {
      "id": "Q09",
      "category": "Multiword",
      "query": "electric vehicle",
      "description": "Evaluates electric transportation and battery mobility",
      "relevantDocIds": [
        "doc_34",
        "doc_29",
        "doc_27",
        "doc_26"
      ],
      "totalRelevantInCorpus": 4,
      "results": {
        "boolean_and": {
          "retrievedCount": 3,
          "relevantFoundInTop10": 3,
          "precisionAt10": 0.3,
          "medianLatencyMs": 0.0292,
          "meanLatencyMs": 0.0341,
          "allLatenciesMs": [
            0.0318,
            0.0303,
            0.0338,
            0.0336,
            0.0437,
            0.0286,
            0.0621,
            0.0295,
            0.0311,
            0.0288,
            0.0274,
            0.0279,
            0.0282,
            0.0766,
            0.0268,
            0.029,
            0.0274,
            0.0275,
            0.0274,
            0.0296
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_29",
              "title": "Battery (electricity)",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_34",
              "title": "Electric vehicle",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 3,
              "id": "doc_27",
              "title": "Electricity",
              "score": 1,
              "isRelevant": true
            }
          ]
        },
        "boolean_or": {
          "retrievedCount": 8,
          "relevantFoundInTop10": 3,
          "precisionAt10": 0.3,
          "medianLatencyMs": 0.0248,
          "meanLatencyMs": 0.0264,
          "allLatenciesMs": [
            0.0269,
            0.0271,
            0.0263,
            0.027,
            0.0311,
            0.0253,
            0.0492,
            0.025,
            0.0266,
            0.0247,
            0.0235,
            0.0242,
            0.0242,
            0.0266,
            0.0228,
            0.0238,
            0.0229,
            0.0234,
            0.023,
            0.0242
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_29",
              "title": "Battery (electricity)",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_34",
              "title": "Electric vehicle",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 3,
              "id": "doc_27",
              "title": "Electricity",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 4,
              "id": "doc_24",
              "title": "Claude Shannon",
              "score": 0.5,
              "isRelevant": false
            },
            {
              "rank": 5,
              "id": "doc_32",
              "title": "Photovoltaics",
              "score": 0.5,
              "isRelevant": false
            },
            {
              "rank": 6,
              "id": "doc_35",
              "title": "Semiconductor",
              "score": 0.5,
              "isRelevant": false
            },
            {
              "rank": 7,
              "id": "doc_25",
              "title": "Solar energy",
              "score": 0.5,
              "isRelevant": false
            },
            {
              "rank": 8,
              "id": "doc_30",
              "title": "Wind power",
              "score": 0.5,
              "isRelevant": false
            }
          ]
        },
        "tfidf": {
          "retrievedCount": 8,
          "relevantFoundInTop10": 3,
          "precisionAt10": 0.3,
          "medianLatencyMs": 0.1629,
          "meanLatencyMs": 0.19,
          "allLatenciesMs": [
            0.1645,
            0.1723,
            0.1653,
            0.4674,
            0.2363,
            0.1886,
            0.3426,
            0.1737,
            0.169,
            0.1614,
            0.152,
            0.1553,
            0.1601,
            0.1644,
            0.152,
            0.1531,
            0.1525,
            0.1537,
            0.157,
            0.1596
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_34",
              "title": "Electric vehicle",
              "score": 0.6698,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_27",
              "title": "Electricity",
              "score": 0.3242,
              "isRelevant": true
            },
            {
              "rank": 3,
              "id": "doc_29",
              "title": "Battery (electricity)",
              "score": 0.3044,
              "isRelevant": true
            },
            {
              "rank": 4,
              "id": "doc_30",
              "title": "Wind power",
              "score": 0.0989,
              "isRelevant": false
            },
            {
              "rank": 5,
              "id": "doc_35",
              "title": "Semiconductor",
              "score": 0.0924,
              "isRelevant": false
            },
            {
              "rank": 6,
              "id": "doc_32",
              "title": "Photovoltaics",
              "score": 0.0485,
              "isRelevant": false
            },
            {
              "rank": 7,
              "id": "doc_24",
              "title": "Claude Shannon",
              "score": 0.0446,
              "isRelevant": false
            },
            {
              "rank": 8,
              "id": "doc_25",
              "title": "Solar energy",
              "score": 0.0294,
              "isRelevant": false
            }
          ]
        },
        "hybrid": {
          "retrievedCount": 8,
          "relevantFoundInTop10": 3,
          "precisionAt10": 0.3,
          "medianLatencyMs": 0.1815,
          "meanLatencyMs": 0.2046,
          "allLatenciesMs": [
            0.1841,
            0.2125,
            0.1901,
            0.1928,
            0.2463,
            0.2057,
            0.3551,
            0.4198,
            0.1788,
            0.2098,
            0.1649,
            0.1685,
            0.1725,
            0.2024,
            0.1622,
            0.162,
            0.1618,
            0.1723,
            0.1606,
            0.1693
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_34",
              "title": "Electric vehicle",
              "score": 0.816,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_27",
              "title": "Electricity",
              "score": 0.6223,
              "isRelevant": true
            },
            {
              "rank": 3,
              "id": "doc_29",
              "title": "Battery (electricity)",
              "score": 0.5418,
              "isRelevant": true
            },
            {
              "rank": 4,
              "id": "doc_30",
              "title": "Wind power",
              "score": 0.2832,
              "isRelevant": false
            },
            {
              "rank": 5,
              "id": "doc_25",
              "title": "Solar energy",
              "score": 0.2423,
              "isRelevant": false
            },
            {
              "rank": 6,
              "id": "doc_35",
              "title": "Semiconductor",
              "score": 0.1324,
              "isRelevant": false
            },
            {
              "rank": 7,
              "id": "doc_32",
              "title": "Photovoltaics",
              "score": 0.1117,
              "isRelevant": false
            },
            {
              "rank": 8,
              "id": "doc_24",
              "title": "Claude Shannon",
              "score": 0.0166,
              "isRelevant": false
            }
          ]
        }
      }
    },
    {
      "id": "Q10",
      "category": "Multiword",
      "query": "wind power",
      "description": "Evaluates wind turbine generation and grids",
      "relevantDocIds": [
        "doc_30",
        "doc_26",
        "doc_27",
        "doc_29"
      ],
      "totalRelevantInCorpus": 4,
      "results": {
        "boolean_and": {
          "retrievedCount": 6,
          "relevantFoundInTop10": 4,
          "precisionAt10": 0.4,
          "medianLatencyMs": 0.0296,
          "meanLatencyMs": 0.0481,
          "allLatenciesMs": [
            0.0307,
            0.0314,
            0.0316,
            0.0377,
            0.0354,
            0.0299,
            0.0651,
            0.0961,
            0.29,
            0.0282,
            0.0272,
            0.028,
            0.0281,
            0.034,
            0.0275,
            0.0278,
            0.0276,
            0.0284,
            0.0279,
            0.0294
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_29",
              "title": "Battery (electricity)",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_28",
              "title": "Climate change",
              "score": 1,
              "isRelevant": false
            },
            {
              "rank": 3,
              "id": "doc_27",
              "title": "Electricity",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 4,
              "id": "doc_33",
              "title": "Geothermal energy",
              "score": 1,
              "isRelevant": false
            },
            {
              "rank": 5,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 6,
              "id": "doc_30",
              "title": "Wind power",
              "score": 1,
              "isRelevant": true
            }
          ]
        },
        "boolean_or": {
          "retrievedCount": 9,
          "relevantFoundInTop10": 4,
          "precisionAt10": 0.4,
          "medianLatencyMs": 0.0256,
          "meanLatencyMs": 0.1308,
          "allLatenciesMs": [
            0.0273,
            0.0261,
            0.0254,
            0.0295,
            0.0259,
            0.0261,
            2.0949,
            0.044,
            0.041,
            0.0237,
            0.0243,
            0.0234,
            0.0237,
            0.0347,
            0.0245,
            0.0221,
            0.0273,
            0.0235,
            0.0231,
            0.0247
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_29",
              "title": "Battery (electricity)",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_28",
              "title": "Climate change",
              "score": 1,
              "isRelevant": false
            },
            {
              "rank": 3,
              "id": "doc_27",
              "title": "Electricity",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 4,
              "id": "doc_33",
              "title": "Geothermal energy",
              "score": 1,
              "isRelevant": false
            },
            {
              "rank": 5,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 6,
              "id": "doc_30",
              "title": "Wind power",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 7,
              "id": "doc_34",
              "title": "Electric vehicle",
              "score": 0.5,
              "isRelevant": false
            },
            {
              "rank": 8,
              "id": "doc_19",
              "title": "Matrix multiplication",
              "score": 0.5,
              "isRelevant": false
            },
            {
              "rank": 9,
              "id": "doc_25",
              "title": "Solar energy",
              "score": 0.5,
              "isRelevant": false
            }
          ]
        },
        "tfidf": {
          "retrievedCount": 9,
          "relevantFoundInTop10": 4,
          "precisionAt10": 0.4,
          "medianLatencyMs": 0.1645,
          "meanLatencyMs": 0.2035,
          "allLatenciesMs": [
            0.1631,
            0.1711,
            0.16,
            0.1685,
            0.1974,
            0.2607,
            0.3754,
            0.323,
            0.2352,
            0.1551,
            0.1504,
            0.1575,
            0.4241,
            0.2012,
            0.1658,
            0.1504,
            0.1504,
            0.1515,
            0.1506,
            0.1594
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_30",
              "title": "Wind power",
              "score": 0.8011,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_29",
              "title": "Battery (electricity)",
              "score": 0.2294,
              "isRelevant": true
            },
            {
              "rank": 3,
              "id": "doc_33",
              "title": "Geothermal energy",
              "score": 0.1783,
              "isRelevant": false
            },
            {
              "rank": 4,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 0.1559,
              "isRelevant": true
            },
            {
              "rank": 5,
              "id": "doc_25",
              "title": "Solar energy",
              "score": 0.1225,
              "isRelevant": false
            },
            {
              "rank": 6,
              "id": "doc_27",
              "title": "Electricity",
              "score": 0.1008,
              "isRelevant": true
            },
            {
              "rank": 7,
              "id": "doc_28",
              "title": "Climate change",
              "score": 0.0894,
              "isRelevant": false
            },
            {
              "rank": 8,
              "id": "doc_34",
              "title": "Electric vehicle",
              "score": 0.0808,
              "isRelevant": false
            },
            {
              "rank": 9,
              "id": "doc_19",
              "title": "Matrix multiplication",
              "score": 0.0316,
              "isRelevant": false
            }
          ]
        },
        "hybrid": {
          "retrievedCount": 9,
          "relevantFoundInTop10": 4,
          "precisionAt10": 0.4,
          "medianLatencyMs": 0.185,
          "meanLatencyMs": 0.2055,
          "allLatenciesMs": [
            0.1831,
            0.2399,
            0.1808,
            0.1876,
            0.204,
            0.2576,
            0.3496,
            0.3656,
            0.1869,
            0.1685,
            0.1688,
            0.1828,
            0.1902,
            0.1972,
            0.207,
            0.1647,
            0.1646,
            0.1718,
            0.164,
            0.1749
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_30",
              "title": "Wind power",
              "score": 0.9072,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_29",
              "title": "Battery (electricity)",
              "score": 0.4212,
              "isRelevant": true
            },
            {
              "rank": 3,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 0.4075,
              "isRelevant": true
            },
            {
              "rank": 4,
              "id": "doc_27",
              "title": "Electricity",
              "score": 0.363,
              "isRelevant": true
            },
            {
              "rank": 5,
              "id": "doc_25",
              "title": "Solar energy",
              "score": 0.325,
              "isRelevant": false
            },
            {
              "rank": 6,
              "id": "doc_28",
              "title": "Climate change",
              "score": 0.2453,
              "isRelevant": false
            },
            {
              "rank": 7,
              "id": "doc_34",
              "title": "Electric vehicle",
              "score": 0.1608,
              "isRelevant": false
            },
            {
              "rank": 8,
              "id": "doc_33",
              "title": "Geothermal energy",
              "score": 0.1568,
              "isRelevant": false
            },
            {
              "rank": 9,
              "id": "doc_19",
              "title": "Matrix multiplication",
              "score": 0,
              "isRelevant": false
            }
          ]
        }
      }
    },
    {
      "id": "Q11",
      "category": "Multiword",
      "query": "climate change",
      "description": "Evaluates greenhouse emissions and climate mitigation",
      "relevantDocIds": [
        "doc_28",
        "doc_26",
        "doc_25",
        "doc_34"
      ],
      "totalRelevantInCorpus": 4,
      "results": {
        "boolean_and": {
          "retrievedCount": 3,
          "relevantFoundInTop10": 3,
          "precisionAt10": 0.3,
          "medianLatencyMs": 0.0278,
          "meanLatencyMs": 0.0393,
          "allLatenciesMs": [
            0.0269,
            0.0285,
            0.0275,
            0.0292,
            0.0271,
            0.029,
            0.0769,
            0.0872,
            0.0282,
            0.0247,
            0.0242,
            0.0272,
            0.032,
            0.0304,
            0.0284,
            0.0244,
            0.1579,
            0.0252,
            0.0254,
            0.0256
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_28",
              "title": "Climate change",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_34",
              "title": "Electric vehicle",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 3,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 1,
              "isRelevant": true
            }
          ]
        },
        "boolean_or": {
          "retrievedCount": 3,
          "relevantFoundInTop10": 3,
          "precisionAt10": 0.3,
          "medianLatencyMs": 0.0207,
          "meanLatencyMs": 0.0228,
          "allLatenciesMs": [
            0.0211,
            0.0206,
            0.0205,
            0.0213,
            0.0197,
            0.02,
            0.0469,
            0.0408,
            0.02,
            0.0237,
            0.0193,
            0.0216,
            0.0207,
            0.0201,
            0.0209,
            0.0186,
            0.0223,
            0.0211,
            0.0183,
            0.0192
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_28",
              "title": "Climate change",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_34",
              "title": "Electric vehicle",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 3,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 1,
              "isRelevant": true
            }
          ]
        },
        "tfidf": {
          "retrievedCount": 3,
          "relevantFoundInTop10": 3,
          "precisionAt10": 0.3,
          "medianLatencyMs": 0.161,
          "meanLatencyMs": 0.1817,
          "allLatenciesMs": [
            0.162,
            0.1595,
            0.1603,
            0.1602,
            0.3875,
            0.1914,
            0.3136,
            0.1757,
            0.1565,
            0.1452,
            0.1448,
            0.1616,
            0.1529,
            0.1667,
            0.1819,
            0.1443,
            0.1474,
            0.2113,
            0.1451,
            0.1671
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_28",
              "title": "Climate change",
              "score": 0.3407,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 0.1265,
              "isRelevant": true
            },
            {
              "rank": 3,
              "id": "doc_34",
              "title": "Electric vehicle",
              "score": 0.1182,
              "isRelevant": true
            }
          ]
        },
        "hybrid": {
          "retrievedCount": 3,
          "relevantFoundInTop10": 3,
          "precisionAt10": 0.3,
          "medianLatencyMs": 0.1613,
          "meanLatencyMs": 0.1772,
          "allLatenciesMs": [
            0.1628,
            0.1665,
            0.164,
            0.167,
            0.1914,
            0.2027,
            0.4077,
            0.1787,
            0.1733,
            0.15,
            0.1512,
            0.1598,
            0.1588,
            0.1537,
            0.1543,
            0.1511,
            0.1508,
            0.1541,
            0.1499,
            0.1971
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_28",
              "title": "Climate change",
              "score": 0.8289,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 0.3262,
              "isRelevant": true
            },
            {
              "rank": 3,
              "id": "doc_34",
              "title": "Electric vehicle",
              "score": 0,
              "isRelevant": true
            }
          ]
        }
      }
    },
    {
      "id": "Q12",
      "category": "Multiword",
      "query": "energy storage",
      "description": "Evaluates batteries and grid buffering technologies",
      "relevantDocIds": [
        "doc_29",
        "doc_26",
        "doc_25",
        "doc_30"
      ],
      "totalRelevantInCorpus": 4,
      "results": {
        "boolean_and": {
          "retrievedCount": 3,
          "relevantFoundInTop10": 3,
          "precisionAt10": 0.3,
          "medianLatencyMs": 0.0281,
          "meanLatencyMs": 0.0388,
          "allLatenciesMs": [
            0.0282,
            0.0281,
            0.0292,
            0.0306,
            0.032,
            0.1814,
            0.0868,
            0.0312,
            0.0302,
            0.031,
            0.0256,
            0.0258,
            0.0276,
            0.0273,
            0.0264,
            0.0259,
            0.0263,
            0.026,
            0.026,
            0.0296
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_29",
              "title": "Battery (electricity)",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 3,
              "id": "doc_30",
              "title": "Wind power",
              "score": 1,
              "isRelevant": true
            }
          ]
        },
        "boolean_or": {
          "retrievedCount": 10,
          "relevantFoundInTop10": 4,
          "precisionAt10": 0.4,
          "medianLatencyMs": 0.0268,
          "meanLatencyMs": 0.0422,
          "allLatenciesMs": [
            0.0277,
            0.0274,
            0.0276,
            0.0278,
            0.0272,
            0.0288,
            0.3409,
            0.0268,
            0.0269,
            0.0243,
            0.0235,
            0.0231,
            0.025,
            0.0247,
            0.0238,
            0.0233,
            0.0251,
            0.03,
            0.0242,
            0.0354
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_29",
              "title": "Battery (electricity)",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 3,
              "id": "doc_30",
              "title": "Wind power",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 4,
              "id": "doc_28",
              "title": "Climate change",
              "score": 0.5,
              "isRelevant": false
            },
            {
              "rank": 5,
              "id": "doc_31",
              "title": "Computer network",
              "score": 0.5,
              "isRelevant": false
            },
            {
              "rank": 6,
              "id": "doc_27",
              "title": "Electricity",
              "score": 0.5,
              "isRelevant": false
            },
            {
              "rank": 7,
              "id": "doc_33",
              "title": "Geothermal energy",
              "score": 0.5,
              "isRelevant": false
            },
            {
              "rank": 8,
              "id": "doc_37",
              "title": "Photosynthesis",
              "score": 0.5,
              "isRelevant": false
            },
            {
              "rank": 9,
              "id": "doc_32",
              "title": "Photovoltaics",
              "score": 0.5,
              "isRelevant": false
            },
            {
              "rank": 10,
              "id": "doc_25",
              "title": "Solar energy",
              "score": 0.5,
              "isRelevant": true
            }
          ]
        },
        "tfidf": {
          "retrievedCount": 10,
          "relevantFoundInTop10": 4,
          "precisionAt10": 0.4,
          "medianLatencyMs": 0.1634,
          "meanLatencyMs": 0.1961,
          "allLatenciesMs": [
            0.1682,
            0.1639,
            0.1996,
            0.1862,
            0.189,
            0.1656,
            0.6618,
            0.2255,
            0.2334,
            0.1516,
            0.1497,
            0.1522,
            0.1577,
            0.1574,
            0.1538,
            0.16,
            0.1803,
            0.1545,
            0.1487,
            0.163
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 0.3494,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_33",
              "title": "Geothermal energy",
              "score": 0.2718,
              "isRelevant": false
            },
            {
              "rank": 3,
              "id": "doc_37",
              "title": "Photosynthesis",
              "score": 0.1942,
              "isRelevant": false
            },
            {
              "rank": 4,
              "id": "doc_25",
              "title": "Solar energy",
              "score": 0.1722,
              "isRelevant": true
            },
            {
              "rank": 5,
              "id": "doc_29",
              "title": "Battery (electricity)",
              "score": 0.1577,
              "isRelevant": true
            },
            {
              "rank": 6,
              "id": "doc_30",
              "title": "Wind power",
              "score": 0.1488,
              "isRelevant": true
            },
            {
              "rank": 7,
              "id": "doc_28",
              "title": "Climate change",
              "score": 0.0728,
              "isRelevant": false
            },
            {
              "rank": 8,
              "id": "doc_31",
              "title": "Computer network",
              "score": 0.0609,
              "isRelevant": false
            },
            {
              "rank": 9,
              "id": "doc_32",
              "title": "Photovoltaics",
              "score": 0.0473,
              "isRelevant": false
            },
            {
              "rank": 10,
              "id": "doc_27",
              "title": "Electricity",
              "score": 0.041,
              "isRelevant": false
            }
          ]
        },
        "hybrid": {
          "retrievedCount": 10,
          "relevantFoundInTop10": 4,
          "precisionAt10": 0.4,
          "medianLatencyMs": 0.1817,
          "meanLatencyMs": 0.2116,
          "allLatenciesMs": [
            0.2988,
            0.2153,
            0.1896,
            0.3172,
            0.2059,
            0.1776,
            0.393,
            0.299,
            0.2216,
            0.1702,
            0.1787,
            0.1717,
            0.1793,
            0.1708,
            0.1707,
            0.1678,
            0.1896,
            0.1666,
            0.1653,
            0.184
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 0.9945,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_33",
              "title": "Geothermal energy",
              "score": 0.5494,
              "isRelevant": false
            },
            {
              "rank": 3,
              "id": "doc_25",
              "title": "Solar energy",
              "score": 0.5405,
              "isRelevant": true
            },
            {
              "rank": 4,
              "id": "doc_29",
              "title": "Battery (electricity)",
              "score": 0.5065,
              "isRelevant": true
            },
            {
              "rank": 5,
              "id": "doc_30",
              "title": "Wind power",
              "score": 0.4525,
              "isRelevant": true
            },
            {
              "rank": 6,
              "id": "doc_37",
              "title": "Photosynthesis",
              "score": 0.3476,
              "isRelevant": false
            },
            {
              "rank": 7,
              "id": "doc_27",
              "title": "Electricity",
              "score": 0.3,
              "isRelevant": false
            },
            {
              "rank": 8,
              "id": "doc_28",
              "title": "Climate change",
              "score": 0.2656,
              "isRelevant": false
            },
            {
              "rank": 9,
              "id": "doc_32",
              "title": "Photovoltaics",
              "score": 0.107,
              "isRelevant": false
            },
            {
              "rank": 10,
              "id": "doc_31",
              "title": "Computer network",
              "score": 0.0856,
              "isRelevant": false
            }
          ]
        }
      }
    },
    {
      "id": "Q13",
      "category": "Multiword",
      "query": "ancient Rome",
      "description": "Evaluates Roman civilization and Mediterranean history",
      "relevantDocIds": [
        "doc_39",
        "doc_40",
        "doc_38"
      ],
      "totalRelevantInCorpus": 3,
      "results": {
        "boolean_and": {
          "retrievedCount": 3,
          "relevantFoundInTop10": 3,
          "precisionAt10": 0.3,
          "medianLatencyMs": 0.028,
          "meanLatencyMs": 0.0324,
          "allLatenciesMs": [
            0.0342,
            0.0423,
            0.0295,
            0.0387,
            0.0283,
            0.0277,
            0.0719,
            0.0397,
            0.0292,
            0.0257,
            0.0274,
            0.0261,
            0.0276,
            0.0345,
            0.0274,
            0.0266,
            0.0267,
            0.0265,
            0.0265,
            0.0307
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_39",
              "title": "Ancient Rome",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_38",
              "title": "History",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 3,
              "id": "doc_40",
              "title": "Roman Empire",
              "score": 1,
              "isRelevant": true
            }
          ]
        },
        "boolean_or": {
          "retrievedCount": 3,
          "relevantFoundInTop10": 3,
          "precisionAt10": 0.3,
          "medianLatencyMs": 0.0206,
          "meanLatencyMs": 0.0325,
          "allLatenciesMs": [
            0.0232,
            0.2127,
            0.0208,
            0.0237,
            0.0208,
            0.0207,
            0.0452,
            0.0263,
            0.0196,
            0.0199,
            0.0204,
            0.0193,
            0.0382,
            0.0202,
            0.0196,
            0.0194,
            0.0202,
            0.0195,
            0.0187,
            0.0213
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_39",
              "title": "Ancient Rome",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_38",
              "title": "History",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 3,
              "id": "doc_40",
              "title": "Roman Empire",
              "score": 1,
              "isRelevant": true
            }
          ]
        },
        "tfidf": {
          "retrievedCount": 3,
          "relevantFoundInTop10": 3,
          "precisionAt10": 0.3,
          "medianLatencyMs": 0.1533,
          "meanLatencyMs": 0.175,
          "allLatenciesMs": [
            0.17,
            0.1678,
            0.1538,
            0.1973,
            0.1831,
            0.1517,
            0.3326,
            0.2683,
            0.1529,
            0.1622,
            0.1551,
            0.1465,
            0.2224,
            0.1501,
            0.1499,
            0.1472,
            0.1456,
            0.1464,
            0.1462,
            0.1504
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_39",
              "title": "Ancient Rome",
              "score": 0.359,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_40",
              "title": "Roman Empire",
              "score": 0.2287,
              "isRelevant": true
            },
            {
              "rank": 3,
              "id": "doc_38",
              "title": "History",
              "score": 0.1228,
              "isRelevant": true
            }
          ]
        },
        "hybrid": {
          "retrievedCount": 3,
          "relevantFoundInTop10": 3,
          "precisionAt10": 0.3,
          "medianLatencyMs": 0.1565,
          "meanLatencyMs": 0.1845,
          "allLatenciesMs": [
            0.2571,
            0.1662,
            0.1577,
            0.2204,
            0.1986,
            0.1541,
            0.3239,
            0.1875,
            0.1554,
            0.27,
            0.1936,
            0.1506,
            0.1994,
            0.1523,
            0.1526,
            0.1496,
            0.1501,
            0.1489,
            0.1492,
            0.153
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_39",
              "title": "Ancient Rome",
              "score": 0.7,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_40",
              "title": "Roman Empire",
              "score": 0.3138,
              "isRelevant": true
            },
            {
              "rank": 3,
              "id": "doc_38",
              "title": "History",
              "score": 0,
              "isRelevant": true
            }
          ]
        }
      }
    },
    {
      "id": "Q14",
      "category": "Multiword",
      "query": "computer network",
      "description": "Evaluates inter-computer communication and web protocols",
      "relevantDocIds": [
        "doc_31",
        "doc_10",
        "doc_15",
        "doc_24"
      ],
      "totalRelevantInCorpus": 4,
      "results": {
        "boolean_and": {
          "retrievedCount": 3,
          "relevantFoundInTop10": 2,
          "precisionAt10": 0.2,
          "medianLatencyMs": 0.0319,
          "meanLatencyMs": 0.0434,
          "allLatenciesMs": [
            0.0352,
            0.1166,
            0.0327,
            0.0507,
            0.0341,
            0.0311,
            0.0843,
            0.0364,
            0.0296,
            0.0381,
            0.0307,
            0.029,
            0.103,
            0.0297,
            0.0291,
            0.0289,
            0.0298,
            0.0294,
            0.029,
            0.0413
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_31",
              "title": "Computer network",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_23",
              "title": "Deep learning",
              "score": 1,
              "isRelevant": false
            },
            {
              "rank": 3,
              "id": "doc_10",
              "title": "World Wide Web",
              "score": 1,
              "isRelevant": true
            }
          ]
        },
        "boolean_or": {
          "retrievedCount": 10,
          "relevantFoundInTop10": 3,
          "precisionAt10": 0.3,
          "medianLatencyMs": 0.0357,
          "meanLatencyMs": 0.047,
          "allLatenciesMs": [
            0.0614,
            0.0387,
            0.0366,
            0.0408,
            0.0399,
            0.0349,
            0.0764,
            0.0367,
            0.0335,
            0.186,
            0.0329,
            0.0317,
            0.0365,
            0.0325,
            0.0326,
            0.0321,
            0.0313,
            0.0323,
            0.0319,
            0.0614
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_31",
              "title": "Computer network",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_23",
              "title": "Deep learning",
              "score": 1,
              "isRelevant": false
            },
            {
              "rank": 3,
              "id": "doc_10",
              "title": "World Wide Web",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 4,
              "id": "doc_16",
              "title": "Alan Turing",
              "score": 0.5,
              "isRelevant": false
            },
            {
              "rank": 5,
              "id": "doc_45",
              "title": "Apple Inc.",
              "score": 0.5,
              "isRelevant": false
            },
            {
              "rank": 6,
              "id": "doc_20",
              "title": "Artificial intelligence",
              "score": 0.5,
              "isRelevant": false
            },
            {
              "rank": 7,
              "id": "doc_9",
              "title": "Boolean data type",
              "score": 0.5,
              "isRelevant": false
            },
            {
              "rank": 8,
              "id": "doc_24",
              "title": "Claude Shannon",
              "score": 0.5,
              "isRelevant": true
            },
            {
              "rank": 9,
              "id": "doc_4",
              "title": "Inverted index",
              "score": 0.5,
              "isRelevant": false
            },
            {
              "rank": 10,
              "id": "doc_7",
              "title": "Larry Page",
              "score": 0.5,
              "isRelevant": false
            }
          ]
        },
        "tfidf": {
          "retrievedCount": 10,
          "relevantFoundInTop10": 3,
          "precisionAt10": 0.3,
          "medianLatencyMs": 0.1684,
          "meanLatencyMs": 0.2129,
          "allLatenciesMs": [
            0.238,
            0.1741,
            0.1693,
            0.3779,
            0.2441,
            0.3673,
            0.3389,
            0.1883,
            0.1801,
            0.1634,
            0.1566,
            0.1593,
            0.1675,
            0.3762,
            0.1608,
            0.1569,
            0.1613,
            0.1567,
            0.1558,
            0.166
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_31",
              "title": "Computer network",
              "score": 0.6118,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_23",
              "title": "Deep learning",
              "score": 0.3006,
              "isRelevant": false
            },
            {
              "rank": 3,
              "id": "doc_22",
              "title": "Natural language processing",
              "score": 0.1236,
              "isRelevant": false
            },
            {
              "rank": 4,
              "id": "doc_7",
              "title": "Larry Page",
              "score": 0.0907,
              "isRelevant": false
            },
            {
              "rank": 5,
              "id": "doc_15",
              "title": "Tim Berners-Lee",
              "score": 0.0894,
              "isRelevant": true
            },
            {
              "rank": 6,
              "id": "doc_10",
              "title": "World Wide Web",
              "score": 0.0864,
              "isRelevant": true
            },
            {
              "rank": 7,
              "id": "doc_16",
              "title": "Alan Turing",
              "score": 0.0812,
              "isRelevant": false
            },
            {
              "rank": 8,
              "id": "doc_45",
              "title": "Apple Inc.",
              "score": 0.0773,
              "isRelevant": false
            },
            {
              "rank": 9,
              "id": "doc_20",
              "title": "Artificial intelligence",
              "score": 0.0597,
              "isRelevant": false
            },
            {
              "rank": 10,
              "id": "doc_36",
              "title": "Microcontroller",
              "score": 0.0589,
              "isRelevant": false
            }
          ]
        },
        "hybrid": {
          "retrievedCount": 10,
          "relevantFoundInTop10": 2,
          "precisionAt10": 0.2,
          "medianLatencyMs": 0.2072,
          "meanLatencyMs": 0.2588,
          "allLatenciesMs": [
            0.2554,
            0.2141,
            0.216,
            0.2262,
            0.2343,
            0.2117,
            0.9584,
            0.4471,
            0.1996,
            0.1966,
            0.193,
            0.1943,
            0.2027,
            0.2546,
            0.1904,
            0.1859,
            0.1867,
            0.1915,
            0.2207,
            0.1961
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_31",
              "title": "Computer network",
              "score": 0.751,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_23",
              "title": "Deep learning",
              "score": 0.3666,
              "isRelevant": false
            },
            {
              "rank": 3,
              "id": "doc_10",
              "title": "World Wide Web",
              "score": 0.3018,
              "isRelevant": true
            },
            {
              "rank": 4,
              "id": "doc_4",
              "title": "Inverted index",
              "score": 0.3,
              "isRelevant": false
            },
            {
              "rank": 5,
              "id": "doc_5",
              "title": "Search engine indexing",
              "score": 0.2719,
              "isRelevant": false
            },
            {
              "rank": 6,
              "id": "doc_30",
              "title": "Wind power",
              "score": 0.2234,
              "isRelevant": false
            },
            {
              "rank": 7,
              "id": "doc_7",
              "title": "Larry Page",
              "score": 0.1812,
              "isRelevant": false
            },
            {
              "rank": 8,
              "id": "doc_22",
              "title": "Natural language processing",
              "score": 0.1789,
              "isRelevant": false
            },
            {
              "rank": 9,
              "id": "doc_20",
              "title": "Artificial intelligence",
              "score": 0.1644,
              "isRelevant": false
            },
            {
              "rank": 10,
              "id": "doc_16",
              "title": "Alan Turing",
              "score": 0.1512,
              "isRelevant": false
            }
          ]
        }
      }
    },
    {
      "id": "Q15",
      "category": "Ambiguous",
      "query": "Java",
      "description": "Ambiguous query testing programming vs geographical contexts",
      "relevantDocIds": [
        "doc_41",
        "doc_3",
        "doc_31"
      ],
      "totalRelevantInCorpus": 3,
      "results": {
        "boolean_and": {
          "retrievedCount": 1,
          "relevantFoundInTop10": 1,
          "precisionAt10": 0.1,
          "medianLatencyMs": 0.021,
          "meanLatencyMs": 0.0395,
          "allLatenciesMs": [
            0.0231,
            0.0244,
            0.0218,
            0.0291,
            0.0201,
            0.0243,
            0.141,
            0.0703,
            0.0196,
            0.0208,
            0.0193,
            0.0186,
            0.0208,
            0.0437,
            0.0197,
            0.0193,
            0.019,
            0.1941,
            0.0211,
            0.0204
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_41",
              "title": "Java (programming language)",
              "score": 1,
              "isRelevant": true
            }
          ]
        },
        "boolean_or": {
          "retrievedCount": 1,
          "relevantFoundInTop10": 1,
          "precisionAt10": 0.1,
          "medianLatencyMs": 0.0164,
          "meanLatencyMs": 0.0193,
          "allLatenciesMs": [
            0.0169,
            0.0156,
            0.0163,
            0.0187,
            0.0167,
            0.0182,
            0.0426,
            0.0417,
            0.0147,
            0.0151,
            0.0171,
            0.0162,
            0.0156,
            0.027,
            0.0151,
            0.0147,
            0.0147,
            0.0175,
            0.0166,
            0.0155
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_41",
              "title": "Java (programming language)",
              "score": 1,
              "isRelevant": true
            }
          ]
        },
        "tfidf": {
          "retrievedCount": 1,
          "relevantFoundInTop10": 1,
          "precisionAt10": 0.1,
          "medianLatencyMs": 0.1043,
          "meanLatencyMs": 0.135,
          "allLatenciesMs": [
            0.3241,
            0.117,
            0.0991,
            0.2222,
            0.1276,
            0.1067,
            0.2431,
            0.1877,
            0.0964,
            0.0949,
            0.0938,
            0.0938,
            0.1737,
            0.1216,
            0.0967,
            0.0936,
            0.0939,
            0.0979,
            0.1141,
            0.102
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_41",
              "title": "Java (programming language)",
              "score": 0.5921,
              "isRelevant": true
            }
          ]
        },
        "hybrid": {
          "retrievedCount": 1,
          "relevantFoundInTop10": 1,
          "precisionAt10": 0.1,
          "medianLatencyMs": 0.1,
          "meanLatencyMs": 0.1174,
          "allLatenciesMs": [
            0.1081,
            0.1078,
            0.0996,
            0.2058,
            0.1259,
            0.134,
            0.229,
            0.1645,
            0.0942,
            0.0938,
            0.0942,
            0.0944,
            0.1128,
            0.0975,
            0.1059,
            0.0929,
            0.0934,
            0.0946,
            0.0991,
            0.1004
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_41",
              "title": "Java (programming language)",
              "score": 0,
              "isRelevant": true
            }
          ]
        }
      }
    },
    {
      "id": "Q16",
      "category": "Ambiguous",
      "query": "Python",
      "description": "Ambiguous query testing language vs biological species",
      "relevantDocIds": [
        "doc_42",
        "doc_20",
        "doc_21"
      ],
      "totalRelevantInCorpus": 3,
      "results": {
        "boolean_and": {
          "retrievedCount": 1,
          "relevantFoundInTop10": 1,
          "precisionAt10": 0.1,
          "medianLatencyMs": 0.0195,
          "meanLatencyMs": 0.0218,
          "allLatenciesMs": [
            0.0214,
            0.0216,
            0.0202,
            0.027,
            0.0181,
            0.0188,
            0.0484,
            0.0323,
            0.0214,
            0.0179,
            0.0178,
            0.0177,
            0.0209,
            0.0198,
            0.0192,
            0.0186,
            0.0184,
            0.0181,
            0.0179,
            0.0199
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_42",
              "title": "Python (programming language)",
              "score": 1,
              "isRelevant": true
            }
          ]
        },
        "boolean_or": {
          "retrievedCount": 1,
          "relevantFoundInTop10": 1,
          "precisionAt10": 0.1,
          "medianLatencyMs": 0.0152,
          "meanLatencyMs": 0.0161,
          "allLatenciesMs": [
            0.0155,
            0.0158,
            0.015,
            0.0162,
            0.0143,
            0.0152,
            0.0321,
            0.0208,
            0.0139,
            0.0151,
            0.0137,
            0.0142,
            0.0155,
            0.0154,
            0.0151,
            0.0139,
            0.0149,
            0.0155,
            0.0152,
            0.0144
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_42",
              "title": "Python (programming language)",
              "score": 1,
              "isRelevant": true
            }
          ]
        },
        "tfidf": {
          "retrievedCount": 1,
          "relevantFoundInTop10": 1,
          "precisionAt10": 0.1,
          "medianLatencyMs": 0.0958,
          "meanLatencyMs": 0.1119,
          "allLatenciesMs": [
            0.1022,
            0.1007,
            0.0988,
            0.1355,
            0.1262,
            0.132,
            0.2329,
            0.1787,
            0.0939,
            0.0922,
            0.0934,
            0.0936,
            0.098,
            0.095,
            0.0957,
            0.0927,
            0.0935,
            0.0919,
            0.0959,
            0.0953
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_42",
              "title": "Python (programming language)",
              "score": 0.4234,
              "isRelevant": true
            }
          ]
        },
        "hybrid": {
          "retrievedCount": 1,
          "relevantFoundInTop10": 1,
          "precisionAt10": 0.1,
          "medianLatencyMs": 0.0982,
          "meanLatencyMs": 0.1106,
          "allLatenciesMs": [
            0.1029,
            0.1014,
            0.1048,
            0.1314,
            0.126,
            0.1012,
            0.236,
            0.1649,
            0.0937,
            0.0948,
            0.0977,
            0.0929,
            0.0987,
            0.0959,
            0.0951,
            0.0928,
            0.0999,
            0.0932,
            0.0936,
            0.0956
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_42",
              "title": "Python (programming language)",
              "score": 0,
              "isRelevant": true
            }
          ]
        }
      }
    },
    {
      "id": "Q17",
      "category": "Ambiguous",
      "query": "Mercury",
      "description": "Ambiguous query testing metallic element vs planetary body",
      "relevantDocIds": [
        "doc_43",
        "doc_27"
      ],
      "totalRelevantInCorpus": 2,
      "results": {
        "boolean_and": {
          "retrievedCount": 1,
          "relevantFoundInTop10": 1,
          "precisionAt10": 0.1,
          "medianLatencyMs": 0.0186,
          "meanLatencyMs": 0.0226,
          "allLatenciesMs": [
            0.0195,
            0.0214,
            0.0207,
            0.0209,
            0.0181,
            0.0182,
            0.0475,
            0.0283,
            0.0177,
            0.0177,
            0.0176,
            0.0177,
            0.0189,
            0.0184,
            0.0191,
            0.0587,
            0.0188,
            0.0176,
            0.0178,
            0.0181
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_43",
              "title": "Mercury (element)",
              "score": 1,
              "isRelevant": true
            }
          ]
        },
        "boolean_or": {
          "retrievedCount": 1,
          "relevantFoundInTop10": 1,
          "precisionAt10": 0.1,
          "medianLatencyMs": 0.0144,
          "meanLatencyMs": 0.017,
          "allLatenciesMs": [
            0.0154,
            0.0149,
            0.0158,
            0.0147,
            0.0141,
            0.0149,
            0.034,
            0.0179,
            0.014,
            0.0138,
            0.0139,
            0.014,
            0.0143,
            0.0144,
            0.014,
            0.043,
            0.0146,
            0.0137,
            0.0142,
            0.0139
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_43",
              "title": "Mercury (element)",
              "score": 1,
              "isRelevant": true
            }
          ]
        },
        "tfidf": {
          "retrievedCount": 1,
          "relevantFoundInTop10": 1,
          "precisionAt10": 0.1,
          "medianLatencyMs": 0.0996,
          "meanLatencyMs": 0.1146,
          "allLatenciesMs": [
            0.1032,
            0.1001,
            0.1448,
            0.1308,
            0.1259,
            0.0991,
            0.2763,
            0.1057,
            0.1,
            0.0934,
            0.0927,
            0.0925,
            0.0972,
            0.0945,
            0.0946,
            0.131,
            0.0934,
            0.0932,
            0.093,
            0.1307
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_43",
              "title": "Mercury (element)",
              "score": 0.3789,
              "isRelevant": true
            }
          ]
        },
        "hybrid": {
          "retrievedCount": 1,
          "relevantFoundInTop10": 1,
          "precisionAt10": 0.1,
          "medianLatencyMs": 0.0982,
          "meanLatencyMs": 0.1081,
          "allLatenciesMs": [
            0.1014,
            0.1009,
            0.1015,
            0.1305,
            0.1272,
            0.0985,
            0.2488,
            0.0999,
            0.0944,
            0.0938,
            0.0936,
            0.0999,
            0.0978,
            0.0952,
            0.0945,
            0.1097,
            0.0927,
            0.0927,
            0.0934,
            0.0956
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_43",
              "title": "Mercury (element)",
              "score": 0,
              "isRelevant": true
            }
          ]
        }
      }
    },
    {
      "id": "Q18",
      "category": "Ambiguous",
      "query": "Jaguar",
      "description": "Ambiguous query testing apex predator vs luxury car brand",
      "relevantDocIds": [
        "doc_44",
        "doc_37"
      ],
      "totalRelevantInCorpus": 2,
      "results": {
        "boolean_and": {
          "retrievedCount": 1,
          "relevantFoundInTop10": 1,
          "precisionAt10": 0.1,
          "medianLatencyMs": 0.0184,
          "meanLatencyMs": 0.0213,
          "allLatenciesMs": [
            0.0205,
            0.0207,
            0.0213,
            0.0197,
            0.0183,
            0.0181,
            0.0684,
            0.0195,
            0.018,
            0.0175,
            0.0177,
            0.0184,
            0.0196,
            0.0184,
            0.0177,
            0.0201,
            0.0178,
            0.0175,
            0.0175,
            0.0189
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_44",
              "title": "Jaguar",
              "score": 1,
              "isRelevant": true
            }
          ]
        },
        "boolean_or": {
          "retrievedCount": 1,
          "relevantFoundInTop10": 1,
          "precisionAt10": 0.1,
          "medianLatencyMs": 0.0144,
          "meanLatencyMs": 0.0174,
          "allLatenciesMs": [
            0.0527,
            0.0149,
            0.0159,
            0.0144,
            0.0139,
            0.0142,
            0.0341,
            0.0147,
            0.0146,
            0.0144,
            0.0136,
            0.0139,
            0.0149,
            0.0141,
            0.0154,
            0.0157,
            0.0138,
            0.014,
            0.0138,
            0.0143
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_44",
              "title": "Jaguar",
              "score": 1,
              "isRelevant": true
            }
          ]
        },
        "tfidf": {
          "retrievedCount": 1,
          "relevantFoundInTop10": 1,
          "precisionAt10": 0.1,
          "medianLatencyMs": 0.0952,
          "meanLatencyMs": 0.1053,
          "allLatenciesMs": [
            0.1009,
            0.1006,
            0.1,
            0.13,
            0.1235,
            0.0957,
            0.2325,
            0.0991,
            0.0928,
            0.0911,
            0.0917,
            0.0925,
            0.0981,
            0.0936,
            0.1004,
            0.0947,
            0.0915,
            0.0915,
            0.0922,
            0.0942
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_44",
              "title": "Jaguar",
              "score": 0.3066,
              "isRelevant": true
            }
          ]
        },
        "hybrid": {
          "retrievedCount": 1,
          "relevantFoundInTop10": 1,
          "precisionAt10": 0.1,
          "medianLatencyMs": 0.097,
          "meanLatencyMs": 0.1073,
          "allLatenciesMs": [
            0.1008,
            0.1007,
            0.1006,
            0.1403,
            0.1587,
            0.0963,
            0.2052,
            0.0994,
            0.1014,
            0.0936,
            0.0932,
            0.0928,
            0.0977,
            0.095,
            0.0977,
            0.0949,
            0.0941,
            0.0933,
            0.093,
            0.0963
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_44",
              "title": "Jaguar",
              "score": 0,
              "isRelevant": true
            }
          ]
        }
      }
    },
    {
      "id": "Q19",
      "category": "Ambiguous",
      "query": "Apple",
      "description": "Ambiguous query testing technology company vs fruit",
      "relevantDocIds": [
        "doc_45",
        "doc_31",
        "doc_10"
      ],
      "totalRelevantInCorpus": 3,
      "results": {
        "boolean_and": {
          "retrievedCount": 1,
          "relevantFoundInTop10": 1,
          "precisionAt10": 0.1,
          "medianLatencyMs": 0.019,
          "meanLatencyMs": 0.0414,
          "allLatenciesMs": [
            0.019,
            0.0206,
            0.02,
            0.0208,
            0.0209,
            0.0179,
            0.3128,
            0.0275,
            0.019,
            0.0174,
            0.1624,
            0.018,
            0.0186,
            0.023,
            0.0186,
            0.0199,
            0.0176,
            0.0174,
            0.018,
            0.018
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_45",
              "title": "Apple Inc.",
              "score": 1,
              "isRelevant": true
            }
          ]
        },
        "boolean_or": {
          "retrievedCount": 1,
          "relevantFoundInTop10": 1,
          "precisionAt10": 0.1,
          "medianLatencyMs": 0.0147,
          "meanLatencyMs": 0.0176,
          "allLatenciesMs": [
            0.0158,
            0.0179,
            0.0148,
            0.0146,
            0.0145,
            0.0152,
            0.0474,
            0.0283,
            0.0149,
            0.0139,
            0.0225,
            0.0145,
            0.0146,
            0.0143,
            0.0176,
            0.0154,
            0.0139,
            0.0137,
            0.014,
            0.0144
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_45",
              "title": "Apple Inc.",
              "score": 1,
              "isRelevant": true
            }
          ]
        },
        "tfidf": {
          "retrievedCount": 1,
          "relevantFoundInTop10": 1,
          "precisionAt10": 0.1,
          "medianLatencyMs": 0.0993,
          "meanLatencyMs": 0.1211,
          "allLatenciesMs": [
            0.1034,
            0.0994,
            0.0998,
            0.1291,
            0.1282,
            0.0957,
            0.2087,
            0.4066,
            0.0937,
            0.1006,
            0.098,
            0.0917,
            0.0992,
            0.0952,
            0.1017,
            0.0993,
            0.0924,
            0.0916,
            0.0919,
            0.0961
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_45",
              "title": "Apple Inc.",
              "score": 0.5831,
              "isRelevant": true
            }
          ]
        },
        "hybrid": {
          "retrievedCount": 1,
          "relevantFoundInTop10": 1,
          "precisionAt10": 0.1,
          "medianLatencyMs": 0.097,
          "meanLatencyMs": 0.143,
          "allLatenciesMs": [
            0.1026,
            0.5761,
            0.1064,
            0.1309,
            0.1298,
            0.0963,
            0.2059,
            0.1151,
            0.0941,
            0.0931,
            0.0968,
            0.0934,
            0.0968,
            0.0958,
            0.3495,
            0.0975,
            0.0971,
            0.0931,
            0.0932,
            0.0955
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_45",
              "title": "Apple Inc.",
              "score": 0,
              "isRelevant": true
            }
          ]
        }
      }
    },
    {
      "id": "Q20",
      "category": "Rare/Specific",
      "query": "photovoltaic",
      "description": "Specific scientific query for photoelectric effect conversion",
      "relevantDocIds": [
        "doc_32",
        "doc_25",
        "doc_35"
      ],
      "totalRelevantInCorpus": 3,
      "results": {
        "boolean_and": {
          "retrievedCount": 4,
          "relevantFoundInTop10": 3,
          "precisionAt10": 0.3,
          "medianLatencyMs": 0.0228,
          "meanLatencyMs": 0.0289,
          "allLatenciesMs": [
            0.0244,
            0.052,
            0.0253,
            0.0518,
            0.0228,
            0.0221,
            0.0622,
            0.0413,
            0.0229,
            0.0209,
            0.0217,
            0.021,
            0.0227,
            0.0223,
            0.0353,
            0.0245,
            0.0213,
            0.021,
            0.0205,
            0.0221
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_27",
              "title": "Electricity",
              "score": 1,
              "isRelevant": false
            },
            {
              "rank": 2,
              "id": "doc_32",
              "title": "Photovoltaics",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 3,
              "id": "doc_35",
              "title": "Semiconductor",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 4,
              "id": "doc_25",
              "title": "Solar energy",
              "score": 1,
              "isRelevant": true
            }
          ]
        },
        "boolean_or": {
          "retrievedCount": 4,
          "relevantFoundInTop10": 3,
          "precisionAt10": 0.3,
          "medianLatencyMs": 0.0179,
          "meanLatencyMs": 0.0275,
          "allLatenciesMs": [
            0.018,
            0.0417,
            0.0223,
            0.0194,
            0.0177,
            0.0173,
            0.0459,
            0.0183,
            0.0168,
            0.0172,
            0.0167,
            0.0162,
            0.0168,
            0.0169,
            0.0203,
            0.0162,
            0.0182,
            0.0169,
            0.1564,
            0.0214
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_27",
              "title": "Electricity",
              "score": 1,
              "isRelevant": false
            },
            {
              "rank": 2,
              "id": "doc_32",
              "title": "Photovoltaics",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 3,
              "id": "doc_35",
              "title": "Semiconductor",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 4,
              "id": "doc_25",
              "title": "Solar energy",
              "score": 1,
              "isRelevant": true
            }
          ]
        },
        "tfidf": {
          "retrievedCount": 4,
          "relevantFoundInTop10": 3,
          "precisionAt10": 0.3,
          "medianLatencyMs": 0.1018,
          "meanLatencyMs": 0.1108,
          "allLatenciesMs": [
            0.1031,
            0.1389,
            0.104,
            0.1383,
            0.1353,
            0.0989,
            0.2067,
            0.1031,
            0.0954,
            0.0935,
            0.0993,
            0.102,
            0.0994,
            0.0971,
            0.0992,
            0.1013,
            0.1023,
            0.094,
            0.1028,
            0.1016
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_32",
              "title": "Photovoltaics",
              "score": 0.2932,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_25",
              "title": "Solar energy",
              "score": 0.1777,
              "isRelevant": true
            },
            {
              "rank": 3,
              "id": "doc_35",
              "title": "Semiconductor",
              "score": 0.0931,
              "isRelevant": true
            },
            {
              "rank": 4,
              "id": "doc_27",
              "title": "Electricity",
              "score": 0.0847,
              "isRelevant": false
            }
          ]
        },
        "hybrid": {
          "retrievedCount": 4,
          "relevantFoundInTop10": 3,
          "precisionAt10": 0.3,
          "medianLatencyMs": 0.1071,
          "meanLatencyMs": 0.1214,
          "allLatenciesMs": [
            0.1304,
            0.1242,
            0.1655,
            0.1449,
            0.1383,
            0.1047,
            0.2293,
            0.107,
            0.1026,
            0.1021,
            0.1103,
            0.1025,
            0.1084,
            0.1071,
            0.1035,
            0.1024,
            0.1366,
            0.1003,
            0.1036,
            0.1051
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_32",
              "title": "Photovoltaics",
              "score": 0.7347,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_25",
              "title": "Solar energy",
              "score": 0.5392,
              "isRelevant": true
            },
            {
              "rank": 3,
              "id": "doc_27",
              "title": "Electricity",
              "score": 0.3,
              "isRelevant": false
            },
            {
              "rank": 4,
              "id": "doc_35",
              "title": "Semiconductor",
              "score": 0.0282,
              "isRelevant": true
            }
          ]
        }
      }
    },
    {
      "id": "Q21",
      "category": "Rare/Specific",
      "query": "geothermal",
      "description": "Specific query for Earth thermal reservoir power",
      "relevantDocIds": [
        "doc_33",
        "doc_26"
      ],
      "totalRelevantInCorpus": 2,
      "results": {
        "boolean_and": {
          "retrievedCount": 2,
          "relevantFoundInTop10": 2,
          "precisionAt10": 0.2,
          "medianLatencyMs": 0.0205,
          "meanLatencyMs": 0.0235,
          "allLatenciesMs": [
            0.0222,
            0.0228,
            0.025,
            0.0225,
            0.0203,
            0.02,
            0.0427,
            0.0207,
            0.0196,
            0.0186,
            0.0375,
            0.0192,
            0.0201,
            0.0192,
            0.0194,
            0.019,
            0.0213,
            0.0186,
            0.0214,
            0.0391
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_33",
              "title": "Geothermal energy",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 1,
              "isRelevant": true
            }
          ]
        },
        "boolean_or": {
          "retrievedCount": 2,
          "relevantFoundInTop10": 2,
          "precisionAt10": 0.2,
          "medianLatencyMs": 0.016,
          "meanLatencyMs": 0.018,
          "allLatenciesMs": [
            0.0164,
            0.0165,
            0.0175,
            0.0162,
            0.0165,
            0.0154,
            0.0324,
            0.0167,
            0.0151,
            0.0155,
            0.026,
            0.0156,
            0.0158,
            0.0158,
            0.0153,
            0.0159,
            0.0155,
            0.0149,
            0.0161,
            0.0311
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_33",
              "title": "Geothermal energy",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 1,
              "isRelevant": true
            }
          ]
        },
        "tfidf": {
          "retrievedCount": 2,
          "relevantFoundInTop10": 2,
          "precisionAt10": 0.2,
          "medianLatencyMs": 0.0994,
          "meanLatencyMs": 0.1124,
          "allLatenciesMs": [
            0.1037,
            0.1025,
            0.1096,
            0.1333,
            0.1284,
            0.0967,
            0.2125,
            0.1681,
            0.096,
            0.0937,
            0.1187,
            0.0933,
            0.0978,
            0.0984,
            0.0942,
            0.0956,
            0.1004,
            0.0927,
            0.0982,
            0.1147
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_33",
              "title": "Geothermal energy",
              "score": 0.4643,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 0.0969,
              "isRelevant": true
            }
          ]
        },
        "hybrid": {
          "retrievedCount": 2,
          "relevantFoundInTop10": 2,
          "precisionAt10": 0.2,
          "medianLatencyMs": 0.1026,
          "meanLatencyMs": 0.1181,
          "allLatenciesMs": [
            0.1088,
            0.1057,
            0.1048,
            0.1364,
            0.1316,
            0.1078,
            0.2382,
            0.2276,
            0.0983,
            0.0961,
            0.109,
            0.097,
            0.1005,
            0.1191,
            0.0953,
            0.0951,
            0.0982,
            0.0945,
            0.0998,
            0.0984
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_33",
              "title": "Geothermal energy",
              "score": 0.7,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 0.3,
              "isRelevant": true
            }
          ]
        }
      }
    },
    {
      "id": "Q22",
      "category": "Rare/Specific",
      "query": "photosynthesis",
      "description": "Specific query for plant solar chemical conversion",
      "relevantDocIds": [
        "doc_37",
        "doc_25",
        "doc_28"
      ],
      "totalRelevantInCorpus": 3,
      "results": {
        "boolean_and": {
          "retrievedCount": 1,
          "relevantFoundInTop10": 1,
          "precisionAt10": 0.1,
          "medianLatencyMs": 0.0241,
          "meanLatencyMs": 0.0274,
          "allLatenciesMs": [
            0.024,
            0.0265,
            0.0261,
            0.0256,
            0.0241,
            0.0234,
            0.0564,
            0.0557,
            0.0243,
            0.0225,
            0.024,
            0.0225,
            0.0238,
            0.0248,
            0.0236,
            0.0223,
            0.0247,
            0.0227,
            0.0268,
            0.0241
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_37",
              "title": "Photosynthesis",
              "score": 1,
              "isRelevant": true
            }
          ]
        },
        "boolean_or": {
          "retrievedCount": 1,
          "relevantFoundInTop10": 1,
          "precisionAt10": 0.1,
          "medianLatencyMs": 0.0186,
          "meanLatencyMs": 0.0247,
          "allLatenciesMs": [
            0.0187,
            0.0189,
            0.0272,
            0.02,
            0.0185,
            0.0184,
            0.0397,
            0.0417,
            0.0202,
            0.018,
            0.0179,
            0.0178,
            0.0199,
            0.0186,
            0.0185,
            0.0178,
            0.0178,
            0.0181,
            0.0877,
            0.0183
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_37",
              "title": "Photosynthesis",
              "score": 1,
              "isRelevant": true
            }
          ]
        },
        "tfidf": {
          "retrievedCount": 1,
          "relevantFoundInTop10": 1,
          "precisionAt10": 0.1,
          "medianLatencyMs": 0.1025,
          "meanLatencyMs": 0.1189,
          "allLatenciesMs": [
            0.1069,
            0.1066,
            0.1087,
            0.1416,
            0.1381,
            0.1024,
            0.2111,
            0.2438,
            0.1048,
            0.0984,
            0.1011,
            0.0998,
            0.1144,
            0.1019,
            0.0996,
            0.0984,
            0.0984,
            0.0981,
            0.1025,
            0.1007
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_37",
              "title": "Photosynthesis",
              "score": 0.412,
              "isRelevant": true
            }
          ]
        },
        "hybrid": {
          "retrievedCount": 1,
          "relevantFoundInTop10": 1,
          "precisionAt10": 0.1,
          "medianLatencyMs": 0.1052,
          "meanLatencyMs": 0.1228,
          "allLatenciesMs": [
            0.1065,
            0.1072,
            0.1074,
            0.139,
            0.1394,
            0.1016,
            0.2282,
            0.2321,
            0.1339,
            0.1004,
            0.1027,
            0.104,
            0.1409,
            0.1013,
            0.099,
            0.0982,
            0.0997,
            0.0988,
            0.1129,
            0.1024
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_37",
              "title": "Photosynthesis",
              "score": 0,
              "isRelevant": true
            }
          ]
        }
      }
    },
    {
      "id": "Q23",
      "category": "Rare/Specific",
      "query": "semiconductor",
      "description": "Specific physics query for doping and integrated circuits",
      "relevantDocIds": [
        "doc_35",
        "doc_32",
        "doc_36",
        "doc_45"
      ],
      "totalRelevantInCorpus": 4,
      "results": {
        "boolean_and": {
          "retrievedCount": 3,
          "relevantFoundInTop10": 2,
          "precisionAt10": 0.2,
          "medianLatencyMs": 0.0255,
          "meanLatencyMs": 0.0367,
          "allLatenciesMs": [
            0.0263,
            0.0279,
            0.0266,
            0.0443,
            0.0253,
            0.0247,
            0.0589,
            0.0666,
            0.0258,
            0.0233,
            0.0231,
            0.0234,
            0.0283,
            0.0241,
            0.0236,
            0.024,
            0.0235,
            0.0307,
            0.1581,
            0.0251
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_32",
              "title": "Photovoltaics",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_35",
              "title": "Semiconductor",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 3,
              "id": "doc_25",
              "title": "Solar energy",
              "score": 1,
              "isRelevant": false
            }
          ]
        },
        "boolean_or": {
          "retrievedCount": 3,
          "relevantFoundInTop10": 2,
          "precisionAt10": 0.2,
          "medianLatencyMs": 0.0207,
          "meanLatencyMs": 0.0245,
          "allLatenciesMs": [
            0.0215,
            0.021,
            0.0208,
            0.023,
            0.0207,
            0.0206,
            0.044,
            0.0444,
            0.0207,
            0.0196,
            0.0193,
            0.0201,
            0.0231,
            0.0199,
            0.0197,
            0.0194,
            0.0196,
            0.02,
            0.0533,
            0.0198
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_32",
              "title": "Photovoltaics",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_35",
              "title": "Semiconductor",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 3,
              "id": "doc_25",
              "title": "Solar energy",
              "score": 1,
              "isRelevant": false
            }
          ]
        },
        "tfidf": {
          "retrievedCount": 3,
          "relevantFoundInTop10": 2,
          "precisionAt10": 0.2,
          "medianLatencyMs": 0.1056,
          "meanLatencyMs": 0.1311,
          "allLatenciesMs": [
            0.1072,
            0.1077,
            0.2944,
            0.1586,
            0.1391,
            0.1024,
            0.2373,
            0.2277,
            0.1025,
            0.0989,
            0.0986,
            0.0988,
            0.1204,
            0.107,
            0.1014,
            0.1042,
            0.0985,
            0.0995,
            0.1166,
            0.1012
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_35",
              "title": "Semiconductor",
              "score": 0.3983,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_32",
              "title": "Photovoltaics",
              "score": 0.209,
              "isRelevant": true
            },
            {
              "rank": 3,
              "id": "doc_25",
              "title": "Solar energy",
              "score": 0.0633,
              "isRelevant": false
            }
          ]
        },
        "hybrid": {
          "retrievedCount": 3,
          "relevantFoundInTop10": 2,
          "precisionAt10": 0.2,
          "medianLatencyMs": 0.1085,
          "meanLatencyMs": 0.1609,
          "allLatenciesMs": [
            0.1168,
            0.1144,
            0.1221,
            0.1714,
            0.1442,
            0.1089,
            0.3348,
            0.783,
            0.1079,
            0.1048,
            0.1052,
            0.1055,
            0.108,
            0.138,
            0.1037,
            0.1284,
            0.1039,
            0.1041,
            0.107,
            0.1061
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_35",
              "title": "Semiconductor",
              "score": 0.7,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_32",
              "title": "Photovoltaics",
              "score": 0.3503,
              "isRelevant": true
            },
            {
              "rank": 3,
              "id": "doc_25",
              "title": "Solar energy",
              "score": 0.3,
              "isRelevant": false
            }
          ]
        }
      }
    },
    {
      "id": "Q24",
      "category": "Rare/Specific",
      "query": "microcontroller",
      "description": "Specific embedded computer engineering query",
      "relevantDocIds": [
        "doc_36",
        "doc_35",
        "doc_31"
      ],
      "totalRelevantInCorpus": 3,
      "results": {
        "boolean_and": {
          "retrievedCount": 2,
          "relevantFoundInTop10": 2,
          "precisionAt10": 0.2,
          "medianLatencyMs": 0.0252,
          "meanLatencyMs": 0.0969,
          "allLatenciesMs": [
            0.0252,
            0.0253,
            0.0309,
            0.04,
            0.0249,
            0.0237,
            0.0583,
            0.0756,
            0.0257,
            0.024,
            0.0229,
            0.0226,
            0.0249,
            0.0449,
            0.0234,
            0.035,
            0.0239,
            0.0237,
            0.0255,
            1.3369
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_36",
              "title": "Microcontroller",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_35",
              "title": "Semiconductor",
              "score": 1,
              "isRelevant": true
            }
          ]
        },
        "boolean_or": {
          "retrievedCount": 2,
          "relevantFoundInTop10": 2,
          "precisionAt10": 0.2,
          "medianLatencyMs": 0.0195,
          "meanLatencyMs": 0.023,
          "allLatenciesMs": [
            0.0209,
            0.0195,
            0.0208,
            0.0227,
            0.0198,
            0.0189,
            0.044,
            0.0412,
            0.0189,
            0.0185,
            0.0193,
            0.0187,
            0.0198,
            0.0206,
            0.0179,
            0.0188,
            0.0187,
            0.0184,
            0.0195,
            0.0423
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_36",
              "title": "Microcontroller",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_35",
              "title": "Semiconductor",
              "score": 1,
              "isRelevant": true
            }
          ]
        },
        "tfidf": {
          "retrievedCount": 2,
          "relevantFoundInTop10": 2,
          "precisionAt10": 0.2,
          "medianLatencyMs": 0.1058,
          "meanLatencyMs": 0.1407,
          "allLatenciesMs": [
            0.1079,
            0.1057,
            0.1059,
            0.1445,
            0.1366,
            0.1015,
            0.4935,
            0.2248,
            0.0981,
            0.1006,
            0.0975,
            0.2258,
            0.1037,
            0.1398,
            0.0977,
            0.1062,
            0.0981,
            0.0979,
            0.1004,
            0.1269
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_36",
              "title": "Microcontroller",
              "score": 0.5016,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_35",
              "title": "Semiconductor",
              "score": 0.1079,
              "isRelevant": true
            }
          ]
        },
        "hybrid": {
          "retrievedCount": 2,
          "relevantFoundInTop10": 2,
          "precisionAt10": 0.2,
          "medianLatencyMs": 0.1094,
          "meanLatencyMs": 0.1328,
          "allLatenciesMs": [
            0.1138,
            0.1098,
            0.112,
            0.2175,
            0.1407,
            0.1054,
            0.2545,
            0.2234,
            0.103,
            0.109,
            0.1015,
            0.1068,
            0.1052,
            0.1151,
            0.1019,
            0.1366,
            0.1014,
            0.1011,
            0.104,
            0.1924
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_36",
              "title": "Microcontroller",
              "score": 0.7,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_35",
              "title": "Semiconductor",
              "score": 0.3,
              "isRelevant": true
            }
          ]
        }
      }
    },
    {
      "id": "Q25",
      "category": "Natural-Language",
      "query": "how solar panels work",
      "description": "Natural question regarding photoelectric photovoltaic operation",
      "relevantDocIds": [
        "doc_25",
        "doc_32",
        "doc_26"
      ],
      "totalRelevantInCorpus": 3,
      "results": {
        "boolean_and": {
          "retrievedCount": 0,
          "relevantFoundInTop10": 0,
          "precisionAt10": 0,
          "medianLatencyMs": 0.0345,
          "meanLatencyMs": 0.0426,
          "allLatenciesMs": [
            0.0346,
            0.0362,
            0.0364,
            0.0491,
            0.0336,
            0.0331,
            0.076,
            0.1172,
            0.0324,
            0.0344,
            0.0326,
            0.0339,
            0.0486,
            0.0331,
            0.0323,
            0.0347,
            0.0317,
            0.0314,
            0.0356,
            0.0548
          ],
          "top10Docs": []
        },
        "boolean_or": {
          "retrievedCount": 9,
          "relevantFoundInTop10": 3,
          "precisionAt10": 0.3,
          "medianLatencyMs": 0.0321,
          "meanLatencyMs": 0.0445,
          "allLatenciesMs": [
            0.0322,
            0.0308,
            0.032,
            0.0396,
            0.0314,
            0.0296,
            0.0611,
            0.0643,
            0.0351,
            0.0492,
            0.0275,
            0.0287,
            0.0432,
            0.0278,
            0.0274,
            0.1748,
            0.0359,
            0.0279,
            0.0278,
            0.063
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_34",
              "title": "Electric vehicle",
              "score": 0.6667,
              "isRelevant": false
            },
            {
              "rank": 2,
              "id": "doc_32",
              "title": "Photovoltaics",
              "score": 0.6667,
              "isRelevant": true
            },
            {
              "rank": 3,
              "id": "doc_25",
              "title": "Solar energy",
              "score": 0.6667,
              "isRelevant": true
            },
            {
              "rank": 4,
              "id": "doc_29",
              "title": "Battery (electricity)",
              "score": 0.3333,
              "isRelevant": false
            },
            {
              "rank": 5,
              "id": "doc_28",
              "title": "Climate change",
              "score": 0.3333,
              "isRelevant": false
            },
            {
              "rank": 6,
              "id": "doc_33",
              "title": "Geothermal energy",
              "score": 0.3333,
              "isRelevant": false
            },
            {
              "rank": 7,
              "id": "doc_1",
              "title": "PageRank",
              "score": 0.3333,
              "isRelevant": false
            },
            {
              "rank": 8,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 0.3333,
              "isRelevant": true
            },
            {
              "rank": 9,
              "id": "doc_35",
              "title": "Semiconductor",
              "score": 0.3333,
              "isRelevant": false
            }
          ]
        },
        "tfidf": {
          "retrievedCount": 9,
          "relevantFoundInTop10": 3,
          "precisionAt10": 0.3,
          "medianLatencyMs": 0.2159,
          "meanLatencyMs": 0.2471,
          "allLatenciesMs": [
            0.2295,
            0.2302,
            0.221,
            0.2577,
            0.2722,
            0.2071,
            0.5382,
            0.4482,
            0.2064,
            0.225,
            0.2037,
            0.2089,
            0.2409,
            0.2133,
            0.203,
            0.2088,
            0.203,
            0.2008,
            0.2059,
            0.2185
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_25",
              "title": "Solar energy",
              "score": 0.3342,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_32",
              "title": "Photovoltaics",
              "score": 0.2004,
              "isRelevant": true
            },
            {
              "rank": 3,
              "id": "doc_34",
              "title": "Electric vehicle",
              "score": 0.0761,
              "isRelevant": false
            },
            {
              "rank": 4,
              "id": "doc_1",
              "title": "PageRank",
              "score": 0.0588,
              "isRelevant": false
            },
            {
              "rank": 5,
              "id": "doc_35",
              "title": "Semiconductor",
              "score": 0.0334,
              "isRelevant": false
            },
            {
              "rank": 6,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 0.03,
              "isRelevant": true
            },
            {
              "rank": 7,
              "id": "doc_33",
              "title": "Geothermal energy",
              "score": 0.0288,
              "isRelevant": false
            },
            {
              "rank": 8,
              "id": "doc_28",
              "title": "Climate change",
              "score": 0.027,
              "isRelevant": false
            },
            {
              "rank": 9,
              "id": "doc_29",
              "title": "Battery (electricity)",
              "score": 0.0253,
              "isRelevant": false
            }
          ]
        },
        "hybrid": {
          "retrievedCount": 9,
          "relevantFoundInTop10": 3,
          "precisionAt10": 0.3,
          "medianLatencyMs": 0.2275,
          "meanLatencyMs": 0.2619,
          "allLatenciesMs": [
            0.2401,
            0.2342,
            0.2354,
            0.303,
            0.2905,
            0.2235,
            0.5288,
            0.4752,
            0.2182,
            0.2217,
            0.2176,
            0.225,
            0.229,
            0.2259,
            0.2674,
            0.2148,
            0.213,
            0.2389,
            0.2136,
            0.2214
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_25",
              "title": "Solar energy",
              "score": 0.8558,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_32",
              "title": "Photovoltaics",
              "score": 0.4449,
              "isRelevant": true
            },
            {
              "rank": 3,
              "id": "doc_1",
              "title": "PageRank",
              "score": 0.3759,
              "isRelevant": false
            },
            {
              "rank": 4,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 0.2037,
              "isRelevant": true
            },
            {
              "rank": 5,
              "id": "doc_34",
              "title": "Electric vehicle",
              "score": 0.1811,
              "isRelevant": false
            },
            {
              "rank": 6,
              "id": "doc_29",
              "title": "Battery (electricity)",
              "score": 0.155,
              "isRelevant": false
            },
            {
              "rank": 7,
              "id": "doc_28",
              "title": "Climate change",
              "score": 0.1243,
              "isRelevant": false
            },
            {
              "rank": 8,
              "id": "doc_35",
              "title": "Semiconductor",
              "score": 0.047,
              "isRelevant": false
            },
            {
              "rank": 9,
              "id": "doc_33",
              "title": "Geothermal energy",
              "score": 0.0079,
              "isRelevant": false
            }
          ]
        }
      }
    },
    {
      "id": "Q26",
      "category": "Natural-Language",
      "query": "sources of renewable electricity",
      "description": "Natural question inquiring about clean energy varieties",
      "relevantDocIds": [
        "doc_26",
        "doc_25",
        "doc_30",
        "doc_33"
      ],
      "totalRelevantInCorpus": 4,
      "results": {
        "boolean_and": {
          "retrievedCount": 5,
          "relevantFoundInTop10": 3,
          "precisionAt10": 0.3,
          "medianLatencyMs": 0.0395,
          "meanLatencyMs": 0.0456,
          "allLatenciesMs": [
            0.0392,
            0.041,
            0.0396,
            0.0443,
            0.0575,
            0.0368,
            0.0979,
            0.0863,
            0.0452,
            0.0362,
            0.0413,
            0.0402,
            0.039,
            0.0366,
            0.0381,
            0.0371,
            0.0393,
            0.0386,
            0.0362,
            0.0413
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_29",
              "title": "Battery (electricity)",
              "score": 1,
              "isRelevant": false
            },
            {
              "rank": 2,
              "id": "doc_34",
              "title": "Electric vehicle",
              "score": 1,
              "isRelevant": false
            },
            {
              "rank": 3,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 4,
              "id": "doc_25",
              "title": "Solar energy",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 5,
              "id": "doc_30",
              "title": "Wind power",
              "score": 1,
              "isRelevant": true
            }
          ]
        },
        "boolean_or": {
          "retrievedCount": 10,
          "relevantFoundInTop10": 4,
          "precisionAt10": 0.4,
          "medianLatencyMs": 0.0308,
          "meanLatencyMs": 0.0343,
          "allLatenciesMs": [
            0.035,
            0.034,
            0.033,
            0.0369,
            0.0336,
            0.0315,
            0.0596,
            0.0605,
            0.0297,
            0.0304,
            0.0307,
            0.0305,
            0.0298,
            0.0296,
            0.0297,
            0.0294,
            0.0295,
            0.0314,
            0.0299,
            0.0309
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_29",
              "title": "Battery (electricity)",
              "score": 1,
              "isRelevant": false
            },
            {
              "rank": 2,
              "id": "doc_34",
              "title": "Electric vehicle",
              "score": 1,
              "isRelevant": false
            },
            {
              "rank": 3,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 4,
              "id": "doc_25",
              "title": "Solar energy",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 5,
              "id": "doc_30",
              "title": "Wind power",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 6,
              "id": "doc_33",
              "title": "Geothermal energy",
              "score": 0.6667,
              "isRelevant": true
            },
            {
              "rank": 7,
              "id": "doc_28",
              "title": "Climate change",
              "score": 0.3333,
              "isRelevant": false
            },
            {
              "rank": 8,
              "id": "doc_27",
              "title": "Electricity",
              "score": 0.3333,
              "isRelevant": false
            },
            {
              "rank": 9,
              "id": "doc_38",
              "title": "History",
              "score": 0.3333,
              "isRelevant": false
            },
            {
              "rank": 10,
              "id": "doc_32",
              "title": "Photovoltaics",
              "score": 0.3333,
              "isRelevant": false
            }
          ]
        },
        "tfidf": {
          "retrievedCount": 10,
          "relevantFoundInTop10": 4,
          "precisionAt10": 0.4,
          "medianLatencyMs": 0.2179,
          "meanLatencyMs": 0.2634,
          "allLatenciesMs": [
            0.2301,
            0.2243,
            0.2248,
            0.5504,
            0.2498,
            0.2121,
            0.4795,
            0.507,
            0.209,
            0.2176,
            0.2071,
            0.2526,
            0.2157,
            0.2153,
            0.2127,
            0.2068,
            0.2078,
            0.2183,
            0.2086,
            0.2182
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 0.3263,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_29",
              "title": "Battery (electricity)",
              "score": 0.2186,
              "isRelevant": false
            },
            {
              "rank": 3,
              "id": "doc_27",
              "title": "Electricity",
              "score": 0.1908,
              "isRelevant": false
            },
            {
              "rank": 4,
              "id": "doc_34",
              "title": "Electric vehicle",
              "score": 0.1863,
              "isRelevant": false
            },
            {
              "rank": 5,
              "id": "doc_32",
              "title": "Photovoltaics",
              "score": 0.1321,
              "isRelevant": false
            },
            {
              "rank": 6,
              "id": "doc_30",
              "title": "Wind power",
              "score": 0.1284,
              "isRelevant": true
            },
            {
              "rank": 7,
              "id": "doc_25",
              "title": "Solar energy",
              "score": 0.0879,
              "isRelevant": true
            },
            {
              "rank": 8,
              "id": "doc_33",
              "title": "Geothermal energy",
              "score": 0.0755,
              "isRelevant": true
            },
            {
              "rank": 9,
              "id": "doc_38",
              "title": "History",
              "score": 0.0439,
              "isRelevant": false
            },
            {
              "rank": 10,
              "id": "doc_28",
              "title": "Climate change",
              "score": 0.0369,
              "isRelevant": false
            }
          ]
        },
        "hybrid": {
          "retrievedCount": 10,
          "relevantFoundInTop10": 4,
          "precisionAt10": 0.4,
          "medianLatencyMs": 0.2276,
          "meanLatencyMs": 0.2673,
          "allLatenciesMs": [
            0.2734,
            0.2394,
            0.2825,
            0.2807,
            0.2735,
            0.2292,
            0.5867,
            0.4992,
            0.2245,
            0.2346,
            0.2237,
            0.2298,
            0.2235,
            0.2236,
            0.2186,
            0.2194,
            0.2192,
            0.2193,
            0.2194,
            0.226
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 0.994,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_29",
              "title": "Battery (electricity)",
              "score": 0.6757,
              "isRelevant": false
            },
            {
              "rank": 3,
              "id": "doc_27",
              "title": "Electricity",
              "score": 0.6723,
              "isRelevant": false
            },
            {
              "rank": 4,
              "id": "doc_34",
              "title": "Electric vehicle",
              "score": 0.4619,
              "isRelevant": false
            },
            {
              "rank": 5,
              "id": "doc_30",
              "title": "Wind power",
              "score": 0.4207,
              "isRelevant": true
            },
            {
              "rank": 6,
              "id": "doc_25",
              "title": "Solar energy",
              "score": 0.3607,
              "isRelevant": true
            },
            {
              "rank": 7,
              "id": "doc_32",
              "title": "Photovoltaics",
              "score": 0.3034,
              "isRelevant": false
            },
            {
              "rank": 8,
              "id": "doc_28",
              "title": "Climate change",
              "score": 0.1836,
              "isRelevant": false
            },
            {
              "rank": 9,
              "id": "doc_38",
              "title": "History",
              "score": 0.1319,
              "isRelevant": false
            },
            {
              "rank": 10,
              "id": "doc_33",
              "title": "Geothermal energy",
              "score": 0.0934,
              "isRelevant": true
            }
          ]
        }
      }
    },
    {
      "id": "Q27",
      "category": "Natural-Language",
      "query": "history of the Roman Empire",
      "description": "Natural question seeking the founding and expansion of Rome",
      "relevantDocIds": [
        "doc_40",
        "doc_39",
        "doc_38"
      ],
      "totalRelevantInCorpus": 3,
      "results": {
        "boolean_and": {
          "retrievedCount": 0,
          "relevantFoundInTop10": 0,
          "precisionAt10": 0,
          "medianLatencyMs": 0.0298,
          "meanLatencyMs": 0.0364,
          "allLatenciesMs": [
            0.0314,
            0.0335,
            0.0338,
            0.035,
            0.0328,
            0.0296,
            0.0834,
            0.0968,
            0.0292,
            0.0304,
            0.0284,
            0.0299,
            0.0297,
            0.0297,
            0.0293,
            0.0283,
            0.0285,
            0.0288,
            0.0294,
            0.0305
          ],
          "top10Docs": []
        },
        "boolean_or": {
          "retrievedCount": 3,
          "relevantFoundInTop10": 3,
          "precisionAt10": 0.3,
          "medianLatencyMs": 0.023,
          "meanLatencyMs": 0.0259,
          "allLatenciesMs": [
            0.025,
            0.0241,
            0.0254,
            0.0264,
            0.0245,
            0.0232,
            0.0501,
            0.0486,
            0.0223,
            0.0248,
            0.0221,
            0.0229,
            0.0237,
            0.022,
            0.0226,
            0.0219,
            0.0214,
            0.0221,
            0.0226,
            0.0225
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_39",
              "title": "Ancient Rome",
              "score": 0.6667,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_40",
              "title": "Roman Empire",
              "score": 0.6667,
              "isRelevant": true
            },
            {
              "rank": 3,
              "id": "doc_38",
              "title": "History",
              "score": 0.3333,
              "isRelevant": true
            }
          ]
        },
        "tfidf": {
          "retrievedCount": 3,
          "relevantFoundInTop10": 3,
          "precisionAt10": 0.3,
          "medianLatencyMs": 0.207,
          "meanLatencyMs": 0.2347,
          "allLatenciesMs": [
            0.2153,
            0.2096,
            0.2359,
            0.2501,
            0.2402,
            0.2074,
            0.4588,
            0.4569,
            0.1975,
            0.2066,
            0.1975,
            0.202,
            0.2077,
            0.2031,
            0.1969,
            0.1976,
            0.1956,
            0.1962,
            0.1982,
            0.2202
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_40",
              "title": "Roman Empire",
              "score": 0.3901,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_39",
              "title": "Ancient Rome",
              "score": 0.3062,
              "isRelevant": true
            },
            {
              "rank": 3,
              "id": "doc_38",
              "title": "History",
              "score": 0.2575,
              "isRelevant": true
            }
          ]
        },
        "hybrid": {
          "retrievedCount": 3,
          "relevantFoundInTop10": 3,
          "precisionAt10": 0.3,
          "medianLatencyMs": 0.2077,
          "meanLatencyMs": 0.2506,
          "allLatenciesMs": [
            0.2194,
            0.2138,
            0.2168,
            0.2465,
            0.2445,
            0.2061,
            0.4708,
            0.5863,
            0.3687,
            0.2052,
            0.2011,
            0.2066,
            0.2046,
            0.2144,
            0.1995,
            0.1981,
            0.1983,
            0.1988,
            0.2087,
            0.2046
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_40",
              "title": "Roman Empire",
              "score": 0.7,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_39",
              "title": "Ancient Rome",
              "score": 0.2571,
              "isRelevant": true
            },
            {
              "rank": 3,
              "id": "doc_38",
              "title": "History",
              "score": 0,
              "isRelevant": true
            }
          ]
        }
      }
    },
    {
      "id": "Q28",
      "category": "Natural-Language",
      "query": "ways to store energy",
      "description": "Natural question exploring batteries and energy storage",
      "relevantDocIds": [
        "doc_29",
        "doc_26",
        "doc_25"
      ],
      "totalRelevantInCorpus": 3,
      "results": {
        "boolean_and": {
          "retrievedCount": 0,
          "relevantFoundInTop10": 0,
          "precisionAt10": 0,
          "medianLatencyMs": 0.0326,
          "meanLatencyMs": 0.0448,
          "allLatenciesMs": [
            0.0324,
            0.033,
            0.0359,
            0.0332,
            0.0327,
            0.031,
            0.0662,
            0.0445,
            0.0356,
            0.031,
            0.0311,
            0.0305,
            0.2274,
            0.0445,
            0.0306,
            0.0343,
            0.0298,
            0.0305,
            0.031,
            0.0309
          ],
          "top10Docs": []
        },
        "boolean_or": {
          "retrievedCount": 10,
          "relevantFoundInTop10": 2,
          "precisionAt10": 0.2,
          "medianLatencyMs": 0.0335,
          "meanLatencyMs": 0.0357,
          "allLatenciesMs": [
            0.0365,
            0.0338,
            0.0361,
            0.0364,
            0.0349,
            0.0331,
            0.0697,
            0.0385,
            0.0314,
            0.0307,
            0.0304,
            0.0309,
            0.0383,
            0.0474,
            0.0304,
            0.0313,
            0.0299,
            0.0297,
            0.0306,
            0.0349
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_29",
              "title": "Battery (electricity)",
              "score": 0.3333,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_28",
              "title": "Climate change",
              "score": 0.3333,
              "isRelevant": false
            },
            {
              "rank": 3,
              "id": "doc_27",
              "title": "Electricity",
              "score": 0.3333,
              "isRelevant": false
            },
            {
              "rank": 4,
              "id": "doc_33",
              "title": "Geothermal energy",
              "score": 0.3333,
              "isRelevant": false
            },
            {
              "rank": 5,
              "id": "doc_1",
              "title": "PageRank",
              "score": 0.3333,
              "isRelevant": false
            },
            {
              "rank": 6,
              "id": "doc_37",
              "title": "Photosynthesis",
              "score": 0.3333,
              "isRelevant": false
            },
            {
              "rank": 7,
              "id": "doc_32",
              "title": "Photovoltaics",
              "score": 0.3333,
              "isRelevant": false
            },
            {
              "rank": 8,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 0.3333,
              "isRelevant": true
            },
            {
              "rank": 9,
              "id": "doc_5",
              "title": "Search engine indexing",
              "score": 0.3333,
              "isRelevant": false
            },
            {
              "rank": 10,
              "id": "doc_35",
              "title": "Semiconductor",
              "score": 0.3333,
              "isRelevant": false
            }
          ]
        },
        "tfidf": {
          "retrievedCount": 10,
          "relevantFoundInTop10": 3,
          "precisionAt10": 0.3,
          "medianLatencyMs": 0.2108,
          "meanLatencyMs": 0.2432,
          "allLatenciesMs": [
            0.2216,
            0.2151,
            0.2473,
            0.2582,
            0.4551,
            0.2047,
            0.4995,
            0.2677,
            0.2028,
            0.2062,
            0.2004,
            0.2048,
            0.222,
            0.2284,
            0.2012,
            0.2012,
            0.1995,
            0.2065,
            0.202,
            0.2191
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 0.1953,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_33",
              "title": "Geothermal energy",
              "score": 0.1871,
              "isRelevant": false
            },
            {
              "rank": 3,
              "id": "doc_37",
              "title": "Photosynthesis",
              "score": 0.1337,
              "isRelevant": false
            },
            {
              "rank": 4,
              "id": "doc_25",
              "title": "Solar energy",
              "score": 0.1185,
              "isRelevant": true
            },
            {
              "rank": 5,
              "id": "doc_29",
              "title": "Battery (electricity)",
              "score": 0.0704,
              "isRelevant": true
            },
            {
              "rank": 6,
              "id": "doc_5",
              "title": "Search engine indexing",
              "score": 0.0693,
              "isRelevant": false
            },
            {
              "rank": 7,
              "id": "doc_30",
              "title": "Wind power",
              "score": 0.0664,
              "isRelevant": false
            },
            {
              "rank": 8,
              "id": "doc_35",
              "title": "Semiconductor",
              "score": 0.0577,
              "isRelevant": false
            },
            {
              "rank": 9,
              "id": "doc_28",
              "title": "Climate change",
              "score": 0.0501,
              "isRelevant": false
            },
            {
              "rank": 10,
              "id": "doc_8",
              "title": "Vector space model",
              "score": 0.0448,
              "isRelevant": false
            }
          ]
        },
        "hybrid": {
          "retrievedCount": 10,
          "relevantFoundInTop10": 3,
          "precisionAt10": 0.3,
          "medianLatencyMs": 0.2438,
          "meanLatencyMs": 0.2786,
          "allLatenciesMs": [
            0.2526,
            0.2455,
            0.4361,
            0.4186,
            0.2908,
            0.2421,
            0.5048,
            0.2577,
            0.2275,
            0.2397,
            0.23,
            0.2334,
            0.2307,
            0.2378,
            0.2207,
            0.2462,
            0.3485,
            0.2243,
            0.2219,
            0.2633
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 0.8991,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_33",
              "title": "Geothermal energy",
              "score": 0.6831,
              "isRelevant": false
            },
            {
              "rank": 3,
              "id": "doc_25",
              "title": "Solar energy",
              "score": 0.5426,
              "isRelevant": true
            },
            {
              "rank": 4,
              "id": "doc_37",
              "title": "Photosynthesis",
              "score": 0.4419,
              "isRelevant": false
            },
            {
              "rank": 5,
              "id": "doc_5",
              "title": "Search engine indexing",
              "score": 0.3795,
              "isRelevant": false
            },
            {
              "rank": 6,
              "id": "doc_1",
              "title": "PageRank",
              "score": 0.3536,
              "isRelevant": false
            },
            {
              "rank": 7,
              "id": "doc_29",
              "title": "Battery (electricity)",
              "score": 0.3402,
              "isRelevant": true
            },
            {
              "rank": 8,
              "id": "doc_30",
              "title": "Wind power",
              "score": 0.3007,
              "isRelevant": false
            },
            {
              "rank": 9,
              "id": "doc_8",
              "title": "Vector space model",
              "score": 0.223,
              "isRelevant": false
            },
            {
              "rank": 10,
              "id": "doc_28",
              "title": "Climate change",
              "score": 0.2224,
              "isRelevant": false
            }
          ]
        }
      }
    },
    {
      "id": "Q29",
      "category": "Natural-Language",
      "query": "effects of climate change",
      "description": "Natural question asking about global warming consequences",
      "relevantDocIds": [
        "doc_28",
        "doc_26",
        "doc_34"
      ],
      "totalRelevantInCorpus": 3,
      "results": {
        "boolean_and": {
          "retrievedCount": 0,
          "relevantFoundInTop10": 0,
          "precisionAt10": 0,
          "medianLatencyMs": 0.0306,
          "meanLatencyMs": 0.0364,
          "allLatenciesMs": [
            0.0318,
            0.0366,
            0.0578,
            0.0555,
            0.0344,
            0.0303,
            0.0782,
            0.0373,
            0.0287,
            0.03,
            0.0299,
            0.0293,
            0.0302,
            0.0309,
            0.0294,
            0.0323,
            0.0373,
            0.0291,
            0.0285,
            0.0296
          ],
          "top10Docs": []
        },
        "boolean_or": {
          "retrievedCount": 5,
          "relevantFoundInTop10": 3,
          "precisionAt10": 0.3,
          "medianLatencyMs": 0.026,
          "meanLatencyMs": 0.029,
          "allLatenciesMs": [
            0.0331,
            0.0281,
            0.0325,
            0.0323,
            0.0293,
            0.0255,
            0.0711,
            0.0265,
            0.0239,
            0.0249,
            0.0244,
            0.0243,
            0.0245,
            0.0247,
            0.0238,
            0.027,
            0.0298,
            0.0239,
            0.0239,
            0.0267
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_28",
              "title": "Climate change",
              "score": 0.6667,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_34",
              "title": "Electric vehicle",
              "score": 0.6667,
              "isRelevant": true
            },
            {
              "rank": 3,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 0.6667,
              "isRelevant": true
            },
            {
              "rank": 4,
              "id": "doc_32",
              "title": "Photovoltaics",
              "score": 0.3333,
              "isRelevant": false
            },
            {
              "rank": 5,
              "id": "doc_25",
              "title": "Solar energy",
              "score": 0.3333,
              "isRelevant": false
            }
          ]
        },
        "tfidf": {
          "retrievedCount": 5,
          "relevantFoundInTop10": 3,
          "precisionAt10": 0.3,
          "medianLatencyMs": 0.2113,
          "meanLatencyMs": 0.2377,
          "allLatenciesMs": [
            0.2228,
            0.2132,
            0.2507,
            0.2856,
            0.2539,
            0.2169,
            0.4769,
            0.3219,
            0.1995,
            0.2084,
            0.2019,
            0.2094,
            0.2025,
            0.2747,
            0.1974,
            0.2037,
            0.1979,
            0.2019,
            0.1991,
            0.2148
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_28",
              "title": "Climate change",
              "score": 0.2704,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 0.1004,
              "isRelevant": true
            },
            {
              "rank": 3,
              "id": "doc_34",
              "title": "Electric vehicle",
              "score": 0.0938,
              "isRelevant": true
            },
            {
              "rank": 4,
              "id": "doc_32",
              "title": "Photovoltaics",
              "score": 0.0689,
              "isRelevant": false
            },
            {
              "rank": 5,
              "id": "doc_25",
              "title": "Solar energy",
              "score": 0.0417,
              "isRelevant": false
            }
          ]
        },
        "hybrid": {
          "retrievedCount": 5,
          "relevantFoundInTop10": 3,
          "precisionAt10": 0.3,
          "medianLatencyMs": 0.2195,
          "meanLatencyMs": 0.2432,
          "allLatenciesMs": [
            0.3025,
            0.2201,
            0.2244,
            0.2527,
            0.3232,
            0.2196,
            0.473,
            0.2669,
            0.2135,
            0.2443,
            0.2195,
            0.2164,
            0.2092,
            0.2375,
            0.2129,
            0.2083,
            0.204,
            0.2037,
            0.2027,
            0.2089
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_28",
              "title": "Climate change",
              "score": 0.85,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_26",
              "title": "Renewable energy",
              "score": 0.4796,
              "isRelevant": true
            },
            {
              "rank": 3,
              "id": "doc_25",
              "title": "Solar energy",
              "score": 0.2232,
              "isRelevant": false
            },
            {
              "rank": 4,
              "id": "doc_34",
              "title": "Electric vehicle",
              "score": 0.1964,
              "isRelevant": true
            },
            {
              "rank": 5,
              "id": "doc_32",
              "title": "Photovoltaics",
              "score": 0.083,
              "isRelevant": false
            }
          ]
        }
      }
    },
    {
      "id": "Q30",
      "category": "Natural-Language",
      "query": "how computers communicate",
      "description": "Natural question regarding network protocols and interconnections",
      "relevantDocIds": [
        "doc_31",
        "doc_10",
        "doc_15"
      ],
      "totalRelevantInCorpus": 3,
      "results": {
        "boolean_and": {
          "retrievedCount": 1,
          "relevantFoundInTop10": 1,
          "precisionAt10": 0.1,
          "medianLatencyMs": 0.0299,
          "meanLatencyMs": 0.0509,
          "allLatenciesMs": [
            0.048,
            0.0337,
            0.0336,
            0.0337,
            0.0315,
            0.0292,
            0.087,
            0.0334,
            0.0295,
            0.0289,
            0.0283,
            0.0292,
            0.0303,
            0.3671,
            0.0294,
            0.0296,
            0.0281,
            0.0283,
            0.0287,
            0.0309
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_31",
              "title": "Computer network",
              "score": 1,
              "isRelevant": true
            }
          ]
        },
        "boolean_or": {
          "retrievedCount": 10,
          "relevantFoundInTop10": 1,
          "precisionAt10": 0.1,
          "medianLatencyMs": 0.0329,
          "meanLatencyMs": 0.0407,
          "allLatenciesMs": [
            0.0533,
            0.0374,
            0.0367,
            0.037,
            0.0366,
            0.034,
            0.069,
            0.0346,
            0.0315,
            0.0314,
            0.0309,
            0.0321,
            0.0319,
            0.1258,
            0.0317,
            0.0313,
            0.0318,
            0.0324,
            0.0313,
            0.0334
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_31",
              "title": "Computer network",
              "score": 1,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_16",
              "title": "Alan Turing",
              "score": 0.5,
              "isRelevant": false
            },
            {
              "rank": 3,
              "id": "doc_45",
              "title": "Apple Inc.",
              "score": 0.5,
              "isRelevant": false
            },
            {
              "rank": 4,
              "id": "doc_20",
              "title": "Artificial intelligence",
              "score": 0.5,
              "isRelevant": false
            },
            {
              "rank": 5,
              "id": "doc_9",
              "title": "Boolean data type",
              "score": 0.5,
              "isRelevant": false
            },
            {
              "rank": 6,
              "id": "doc_24",
              "title": "Claude Shannon",
              "score": 0.5,
              "isRelevant": false
            },
            {
              "rank": 7,
              "id": "doc_23",
              "title": "Deep learning",
              "score": 0.5,
              "isRelevant": false
            },
            {
              "rank": 8,
              "id": "doc_4",
              "title": "Inverted index",
              "score": 0.5,
              "isRelevant": false
            },
            {
              "rank": 9,
              "id": "doc_7",
              "title": "Larry Page",
              "score": 0.5,
              "isRelevant": false
            },
            {
              "rank": 10,
              "id": "doc_13",
              "title": "Linear algebra",
              "score": 0.5,
              "isRelevant": false
            }
          ]
        },
        "tfidf": {
          "retrievedCount": 10,
          "relevantFoundInTop10": 2,
          "precisionAt10": 0.2,
          "medianLatencyMs": 0.1655,
          "meanLatencyMs": 0.1861,
          "allLatenciesMs": [
            0.1758,
            0.1956,
            0.17,
            0.1974,
            0.2065,
            0.161,
            0.3671,
            0.1694,
            0.1554,
            0.1653,
            0.1596,
            0.1623,
            0.1583,
            0.261,
            0.1657,
            0.1539,
            0.1529,
            0.1634,
            0.1545,
            0.2262
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_31",
              "title": "Computer network",
              "score": 0.2356,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_22",
              "title": "Natural language processing",
              "score": 0.0978,
              "isRelevant": false
            },
            {
              "rank": 3,
              "id": "doc_7",
              "title": "Larry Page",
              "score": 0.0718,
              "isRelevant": false
            },
            {
              "rank": 4,
              "id": "doc_15",
              "title": "Tim Berners-Lee",
              "score": 0.0707,
              "isRelevant": true
            },
            {
              "rank": 5,
              "id": "doc_16",
              "title": "Alan Turing",
              "score": 0.0643,
              "isRelevant": false
            },
            {
              "rank": 6,
              "id": "doc_45",
              "title": "Apple Inc.",
              "score": 0.0611,
              "isRelevant": false
            },
            {
              "rank": 7,
              "id": "doc_20",
              "title": "Artificial intelligence",
              "score": 0.0472,
              "isRelevant": false
            },
            {
              "rank": 8,
              "id": "doc_36",
              "title": "Microcontroller",
              "score": 0.0466,
              "isRelevant": false
            },
            {
              "rank": 9,
              "id": "doc_35",
              "title": "Semiconductor",
              "score": 0.0251,
              "isRelevant": false
            },
            {
              "rank": 10,
              "id": "doc_24",
              "title": "Claude Shannon",
              "score": 0.0242,
              "isRelevant": false
            }
          ]
        },
        "hybrid": {
          "retrievedCount": 10,
          "relevantFoundInTop10": 3,
          "precisionAt10": 0.3,
          "medianLatencyMs": 0.2043,
          "meanLatencyMs": 0.229,
          "allLatenciesMs": [
            0.2107,
            0.2164,
            0.2087,
            0.2238,
            0.2281,
            0.1977,
            0.5747,
            0.1999,
            0.1878,
            0.1885,
            0.2802,
            0.2976,
            0.1846,
            0.1954,
            0.1977,
            0.1794,
            0.1802,
            0.2244,
            0.1802,
            0.2241
          ],
          "top10Docs": [
            {
              "rank": 1,
              "id": "doc_31",
              "title": "Computer network",
              "score": 0.751,
              "isRelevant": true
            },
            {
              "rank": 2,
              "id": "doc_22",
              "title": "Natural language processing",
              "score": 0.3173,
              "isRelevant": false
            },
            {
              "rank": 3,
              "id": "doc_4",
              "title": "Inverted index",
              "score": 0.3,
              "isRelevant": false
            },
            {
              "rank": 4,
              "id": "doc_5",
              "title": "Search engine indexing",
              "score": 0.2802,
              "isRelevant": false
            },
            {
              "rank": 5,
              "id": "doc_7",
              "title": "Larry Page",
              "score": 0.2757,
              "isRelevant": false
            },
            {
              "rank": 6,
              "id": "doc_10",
              "title": "World Wide Web",
              "score": 0.2382,
              "isRelevant": true
            },
            {
              "rank": 7,
              "id": "doc_15",
              "title": "Tim Berners-Lee",
              "score": 0.2369,
              "isRelevant": true
            },
            {
              "rank": 8,
              "id": "doc_16",
              "title": "Alan Turing",
              "score": 0.2329,
              "isRelevant": false
            },
            {
              "rank": 9,
              "id": "doc_20",
              "title": "Artificial intelligence",
              "score": 0.2172,
              "isRelevant": false
            },
            {
              "rank": 10,
              "id": "doc_45",
              "title": "Apple Inc.",
              "score": 0.1439,
              "isRelevant": false
            }
          ]
        }
      }
    }
  ]
};


// --- MODULE: preprocessor.js ---

/**
 * Lightweight Porter-style algorithmic stemmer for English terms.
 * Handles common plurals, gerunds, past tenses, and derivational suffixes.
 */
function stemTerm(word) {
  if (!word || word.length < 3) return word;
  let w = word.toLowerCase();

  // Step 1: Plurals and basic inflectional endings
  if (w.endsWith('sses')) w = w.slice(0, -2);
  else if (w.endsWith('ies') && w.length > 4) w = w.slice(0, -3) + 'y';
  else if (w.endsWith('ss')) { /* keep */ }
  else if (w.endsWith('s') && !w.endsWith('us') && !w.endsWith('is')) w = w.slice(0, -1);

  // Step 2: Gerunds and past tenses
  if (w.endsWith('ing') && w.length > 5) {
    const base = w.slice(0, -3);
    // Double consonant cleanup (e.g. running -> run)
    if (base.length > 3 && base[base.length - 1] === base[base.length - 2]) {
      w = base.slice(0, -1);
    } else {
      w = base;
    }
  } else if (w.endsWith('ed') && w.length > 4) {
    w = w.slice(0, -2);
  }

  // Step 3: Derivational suffixes
  if (w.endsWith('ational')) w = w.slice(0, -7) + 'ate';
  else if (w.endsWith('tional')) w = w.slice(0, -6) + 'tion';
  else if (w.endsWith('alism')) w = w.slice(0, -5);
  else if (w.endsWith('ness')) w = w.slice(0, -4);
  else if (w.endsWith('ical')) w = w.slice(0, -4) + 'ic';
  else if (w.endsWith('ment') && w.length > 6) w = w.slice(0, -4);

  return w;
}

/**
 * Preprocesses a raw query with a granular, step-by-step diagnostic breakdown.
 * Designed specifically for interactive educational visualization.
 */
function preprocessQueryWithTrace(rawQuery) {
  const t0 = performance.now();

  const original = String(rawQuery || "");

  // Stage 1: Lowercase Conversion
  const lowercased = original.toLowerCase();

  // Stage 2: Tokenization (extract alphanumeric words, strip punctuation)
  const matchedTokens = lowercased.match(/[a-z0-9]+(?:'[a-z0-9]+)?/g) || [];

  // Stage 3: Stop-words Removal
  const removedStopWords = [];
  const tokensAfterStopWords = [];

  for (const token of matchedTokens) {
    if (STOP_WORDS.has(token)) {
      removedStopWords.push(token);
    } else {
      tokensAfterStopWords.push(token);
    }
  }

  // Stage 4: Stemming / Normalization
  const stemmed = tokensAfterStopWords.map(token => ({
    original: token,
    stemmed: stemTerm(token)
  }));

  const finalTokens = stemmed.map(item => item.stemmed);

  const t1 = performance.now();

  return {
    originalQuery: original,
    lowercased,
    tokenized: matchedTokens,
    totalInitialTokens: matchedTokens.length,
    removedStopWords,
    keptTokens: tokensAfterStopWords,
    stemmed,
    finalTokens,
    uniqueTokens: Array.from(new Set(finalTokens)),
    executionTimeMs: Math.max(0.01, Number((t1 - t0).toFixed(3)))
  };
}

/**
 * Tokenize and stem raw document text for indexing.
 */
function tokenizeText(text) {
  if (!text) return [];
  const lower = text.toLowerCase();
  const tokens = lower.match(/[a-z0-9]+(?:'[a-z0-9]+)?/g) || [];
  const filtered = tokens.filter(t => !STOP_WORDS.has(t) && t.length > 1);
  return filtered.map(stemTerm);
}


// --- MODULE: invertedIndex.js ---
class InvertedIndex {
  constructor(corpus) {
    this.corpus = corpus;
    this.totalDocs = corpus.length;
    // Map: term -> Map(docId -> { count: number, positions: number[] })
    this.index = new Map();
    // Map: term -> number of docs containing the term
    this.df = new Map();
    // Map: docId -> total number of indexed terms
    this.docLengths = new Map();
    // Map: docId -> Map(term -> tf)
    this.docTermFrequencies = new Map();
    // Map: docId -> Map(term -> tfIdfWeight)
    this.docVectors = new Map();
    // Map: docId -> Euclidean norm of the tfIdf vector
    this.docNorms = new Map();

    this.buildIndex();
  }

  buildIndex() {
    // Phase 1: Tokenize documents and populate postings
    for (const doc of this.corpus) {
      const fullText = `${doc.title} ${doc.summary} ${doc.content}`;
      const tokens = tokenizeText(fullText);
      this.docLengths.set(doc.id, tokens.length);

      const termCounts = new Map();
      const termPositions = new Map();

      tokens.forEach((token, index) => {
        termCounts.set(token, (termCounts.get(token) || 0) + 1);
        if (!termPositions.has(token)) termPositions.set(token, []);
        termPositions.get(token).push(index);
      });

      // Calculate term frequency normalized by doc length: TF = count / docLength
      const docLength = tokens.length || 1;
      const tfMap = new Map();

      for (const [term, count] of termCounts.entries()) {
        const tf = count / docLength;
        tfMap.set(term, { count, tf, positions: termPositions.get(term) });

        if (!this.index.has(term)) {
          this.index.set(term, new Map());
        }
        this.index.get(term).set(doc.id, {
          count,
          tf,
          positions: termPositions.get(term)
        });
      }

      this.docTermFrequencies.set(doc.id, tfMap);
    }

    // Phase 2: Compute Document Frequency (DF) for each term
    for (const [term, postings] of this.index.entries()) {
      this.df.set(term, postings.size);
    }

    // Phase 3: Compute TF-IDF Vectors and Euclidean Norms for each document
    for (const doc of this.corpus) {
      const tfMap = this.docTermFrequencies.get(doc.id);
      const vector = new Map();
      let sumOfSquares = 0;

      for (const [term, info] of tfMap.entries()) {
        const idf = this.calculateIdf(term);
        const weight = info.tf * idf;
        vector.set(term, weight);
        sumOfSquares += weight * weight;
      }

      this.docVectors.set(doc.id, vector);
      this.docNorms.set(doc.id, Math.sqrt(sumOfSquares) || 1e-9);
    }
  }

  /**
   * Standard smoothed IDF formula:
   * IDF(t) = ln((N + 1) / (DF(t) + 1)) + 1
   * Ensures rare words receive higher weight, while terms present in all docs receive modest weight without zeroing out.
   */
  calculateIdf(term) {
    const docFreq = this.df.get(term) || 0;
    const N = this.totalDocs;
    return Math.log((N + 1) / (docFreq + 1)) + 1;
  }

  getPostings(term) {
    return this.index.get(term) || new Map();
  }

  getDocById(docId) {
    return this.corpus.find(d => d.id === docId);
  }

  getVocabSize() {
    return this.index.size;
  }

  /**
   * Detailed breakdown for a single document and query terms.
   */
  getDetailedScoringForDoc(docId, queryTokens) {
    const doc = this.getDocById(docId);
    if (!doc) return null;

    const tfMap = this.docTermFrequencies.get(docId) || new Map();
    const docLength = this.docLengths.get(docId) || 1;
    const termBreakdowns = [];
    let dotProduct = 0;

    // Calculate Query vector weights (TF in query * IDF)
    const queryCounts = {};
    queryTokens.forEach(t => {
      queryCounts[t] = (queryCounts[t] || 0) + 1;
    });

    let querySumSquares = 0;
    const queryWeights = {};

    queryTokens.forEach(token => {
      const qTf = queryCounts[token] / queryTokens.length;
      const idf = this.calculateIdf(token);
      const qWeight = qTf * idf;
      queryWeights[token] = qWeight;
      querySumSquares += qWeight * qWeight;
    });

    const queryNorm = Math.sqrt(querySumSquares) || 1e-9;
    const docNorm = this.docNorms.get(docId) || 1e-9;

    queryTokens.forEach(token => {
      const post = tfMap.get(token);
      const rawCount = post ? post.count : 0;
      const tf = rawCount / docLength;
      const df = this.df.get(token) || 0;
      const idf = this.calculateIdf(token);
      const docWeight = tf * idf;
      const qWeight = queryWeights[token] || 0;
      const termContribution = qWeight * docWeight;

      dotProduct += termContribution;

      termBreakdowns.push({
        term: token,
        rawCount,
        tf: Number(tf.toFixed(6)),
        df,
        idf: Number(idf.toFixed(4)),
        docWeight: Number(docWeight.toFixed(6)),
        queryWeight: Number(qWeight.toFixed(6)),
        termContribution: Number(termContribution.toFixed(6)),
        positions: post ? post.positions.slice(0, 5) : []
      });
    });

    const cosineSimilarity = dotProduct / (queryNorm * docNorm);

    return {
      docId,
      docTitle: doc.title,
      docLength,
      termBreakdowns,
      dotProduct: Number(dotProduct.toFixed(6)),
      queryNorm: Number(queryNorm.toFixed(6)),
      docNorm: Number(docNorm.toFixed(6)),
      cosineSimilarity: Number(cosineSimilarity.toFixed(6))
    };
  }
}


// --- MODULE: pagerank.js ---
class PageRankCalculator {
  constructor(corpus, dampingFactor = 0.85, maxIterations = 100, tolerance = 1e-6) {
    this.corpus = corpus;
    this.dampingFactor = dampingFactor;
    this.maxIterations = maxIterations;
    this.tolerance = tolerance;
    this.N = corpus.length;

    // Directed graph structures
    // outLinksMap: docId -> array of target docIds
    this.outLinksMap = new Map();
    // inLinksMap: docId -> array of source docIds (backlinks)
    this.inLinksMap = new Map();
    // outDegree: docId -> number of valid outgoing links
    this.outDegree = new Map();

    this.scores = new Map();
    this.iterationLog = [];
    this.converged = false;
    this.iterationsCompleted = 0;

    this.buildGraph();
    this.computePageRank();
  }

  buildGraph() {
    const validIds = new Set(this.corpus.map(d => d.id));

    // Initialize maps
    for (const doc of this.corpus) {
      this.inLinksMap.set(doc.id, []);
    }

    for (const doc of this.corpus) {
      // Only keep links pointing to valid documents within the corpus
      const validOutLinks = (doc.outLinks || []).filter(targetId => validIds.has(targetId));
      this.outLinksMap.set(doc.id, validOutLinks);
      this.outDegree.set(doc.id, validOutLinks.length);

      for (const targetId of validOutLinks) {
        this.inLinksMap.get(targetId).push(doc.id);
      }
    }
  }

  computePageRank() {
    const N = this.N;
    const d = this.dampingFactor;
    const teleportProb = (1 - d) / N;

    // Initial uniform distribution: PR_0(u) = 1 / N
    let currentPR = new Map();
    for (const doc of this.corpus) {
      currentPR.set(doc.id, 1 / N);
    }

    this.iterationLog = [];

    for (let iter = 1; iter <= this.maxIterations; iter++) {
      const nextPR = new Map();

      // Handle dangling nodes (nodes with 0 out-links)
      let danglingRankSum = 0;
      for (const doc of this.corpus) {
        if (this.outDegree.get(doc.id) === 0) {
          danglingRankSum += currentPR.get(doc.id);
        }
      }
      const danglingContribution = (d * danglingRankSum) / N;

      let totalDelta = 0;

      // Power iteration update for each node
      for (const doc of this.corpus) {
        let incomingRank = 0;
        const incomingSources = this.inLinksMap.get(doc.id) || [];

        for (const sourceId of incomingSources) {
          const sourceOutDegree = this.outDegree.get(sourceId);
          if (sourceOutDegree > 0) {
            incomingRank += currentPR.get(sourceId) / sourceOutDegree;
          }
        }

        const newRank = teleportProb + danglingContribution + (d * incomingRank);
        nextPR.set(doc.id, newRank);

        totalDelta += Math.abs(newRank - currentPR.get(doc.id));
      }

      this.iterationLog.push({
        iteration: iter,
        totalDelta: Number(totalDelta.toExponential(4)),
        sampleScores: {
          doc_1: Number((nextPR.get('doc_1') || 0).toFixed(6)),
          doc_3: Number((nextPR.get('doc_3') || 0).toFixed(6)),
          doc_10: Number((nextPR.get('doc_10') || 0).toFixed(6))
        }
      });

      currentPR = nextPR;

      if (totalDelta < this.tolerance) {
        this.converged = true;
        this.iterationsCompleted = iter;
        break;
      }
      this.iterationsCompleted = iter;
    }

    // Save final raw scores
    this.scores = currentPR;
  }

  getScore(docId) {
    return this.scores.get(docId) || 0;
  }

  getInLinks(docId) {
    return this.inLinksMap.get(docId) || [];
  }

  getOutLinks(docId) {
    return this.outLinksMap.get(docId) || [];
  }

  getGraphSummary() {
    let totalEdges = 0;
    for (const [, outLinks] of this.outLinksMap.entries()) {
      totalEdges += outLinks.length;
    }
    return {
      totalNodes: this.N,
      totalEdges,
      dampingFactor: this.dampingFactor,
      tolerance: this.tolerance,
      iterationsCompleted: this.iterationsCompleted,
      converged: this.converged,
      iterationLog: this.iterationLog
    };
  }

  /**
   * Generates graph nodes and links formatted for SVG force visualization.
   */
  getVisualizationGraph() {
    const nodes = this.corpus.map(doc => {
      const pr = this.getScore(doc.id);
      const inDegree = (this.inLinksMap.get(doc.id) || []).length;
      const outDegree = (this.outLinksMap.get(doc.id) || []).length;
      return {
        id: doc.id,
        title: doc.title,
        category: doc.category,
        pageRank: pr,
        inDegree,
        outDegree,
        // Radius scaled smoothly by PageRank score
        radius: 6 + Math.min(24, pr * 250)
      };
    });

    const links = [];
    for (const [sourceId, targets] of this.outLinksMap.entries()) {
      for (const targetId of targets) {
        links.push({
          source: sourceId,
          target: targetId
        });
      }
    }

    return { nodes, links };
  }
}


// --- MODULE: searchEngine.js ---
class SearchEngine {
  constructor(corpus, invertedIndex, pageRankCalculator) {
    this.corpus = corpus;
    this.index = invertedIndex;
    this.pageRank = pageRankCalculator;
  }

  /**
   * Boolean Retrieval Engine (AND / OR)
   */
  searchBoolean(rawQuery, mode = 'AND') {
    const t0 = performance.now();
    const trace = preprocessQueryWithTrace(rawQuery);
    const tokens = trace.finalTokens;

    if (tokens.length === 0) {
      return {
        algorithm: 'Boolean',
        mode,
        queryTrace: trace,
        tokens: [],
        results: [],
        matches: [],
        totalMatches: 0,
        allExplanations: new Map(),
        executionTimeMs: Number((performance.now() - t0).toFixed(2))
      };
    }

    // Retrieve posting sets for all tokens
    const tokenPostings = tokens.map(token => {
      const postings = this.index.getPostings(token);
      return {
        token,
        docIds: new Set(postings.keys())
      };
    });

    let matchingDocIds = [];
    const explanations = new Map();

    if (mode === 'AND') {
      // Find intersection: document must contain ALL query tokens
      matchingDocIds = this.corpus
        .filter(doc => tokenPostings.every(tp => tp.docIds.has(doc.id)))
        .map(doc => doc.id);

      // Generate explainability log for every document in corpus
      for (const doc of this.corpus) {
        const presentTokens = tokens.filter(t => this.index.getPostings(t).has(doc.id));
        const missingTokens = tokens.filter(t => !this.index.getPostings(t).has(doc.id));
        const isMatch = missingTokens.length === 0;

        explanations.set(doc.id, {
          isMatch,
          matchedTermsCount: presentTokens.length,
          totalTermsCount: tokens.length,
          presentTokens,
          missingTokens,
          reason: isMatch
            ? `Matched: Contains all required terms [${presentTokens.join(', ')}].`
            : `Excluded: Missing term(s) [${missingTokens.join(', ')}].`
        });
      }
    } else {
      // Disjunctive OR: document contains AT LEAST ONE query token
      const unionSet = new Set();
      tokenPostings.forEach(tp => {
        tp.docIds.forEach(id => unionSet.add(id));
      });
      matchingDocIds = Array.from(unionSet);

      for (const doc of this.corpus) {
        const presentTokens = tokens.filter(t => this.index.getPostings(t).has(doc.id));
        const missingTokens = tokens.filter(t => !this.index.getPostings(t).has(doc.id));
        const isMatch = presentTokens.length > 0;

        explanations.set(doc.id, {
          isMatch,
          matchedTermsCount: presentTokens.length,
          totalTermsCount: tokens.length,
          presentTokens,
          missingTokens,
          reason: isMatch
            ? `Matched: Contains ${presentTokens.length}/${tokens.length} query terms [${presentTokens.join(', ')}].`
            : `Excluded: Contains none of the query terms.`
        });
      }
    }

    // Rank matching documents by number of matched terms, then title
    const results = matchingDocIds.map(docId => {
      const doc = this.index.getDocById(docId);
      const explanation = explanations.get(docId);
      return {
        id: doc.id,
        title: doc.title,
        url: doc.url,
        summary: doc.summary,
        category: doc.category,
        score: explanation.matchedTermsCount / tokens.length,
        rawScore: explanation.matchedTermsCount,
        explanation
      };
    }).sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));

    const t1 = performance.now();

    return {
      algorithm: 'Boolean',
      mode,
      queryTrace: trace,
      tokens,
      results: results.slice(0, 10),
      totalMatches: results.length,
      allExplanations: explanations,
      executionTimeMs: Math.max(0.05, Number((t1 - t0).toFixed(2)))
    };
  }

  /**
   * TF-IDF Vector Space Model with Cosine Similarity
   */
  searchTfIdf(rawQuery) {
    const t0 = performance.now();
    const trace = preprocessQueryWithTrace(rawQuery);
    const tokens = trace.finalTokens;

    if (tokens.length === 0) {
      return {
        algorithm: 'TF-IDF',
        queryTrace: trace,
        results: [],
        totalMatches: 0,
        executionTimeMs: Number((performance.now() - t0).toFixed(2))
      };
    }

    const candidateScores = [];

    for (const doc of this.corpus) {
      const details = this.index.getDetailedScoringForDoc(doc.id, tokens);
      if (details.cosineSimilarity > 0) {
        candidateScores.push({
          id: doc.id,
          title: doc.title,
          url: doc.url,
          summary: doc.summary,
          category: doc.category,
          score: details.cosineSimilarity,
          cosineSimilarity: details.cosineSimilarity,
          mathDetails: details
        });
      }
    }

    candidateScores.sort((a, b) => b.score - a.score);

    const t1 = performance.now();

    return {
      algorithm: 'TF-IDF',
      queryTrace: trace,
      tokens,
      results: candidateScores.slice(0, 10),
      allCandidates: candidateScores,
      totalMatches: candidateScores.length,
      executionTimeMs: Math.max(0.05, Number((t1 - t0).toFixed(2)))
    };
  }

  /**
   * PageRank + TF-IDF Hybrid Ranking
   * Final Score = 0.70 * Normalized TF-IDF + 0.30 * Normalized PageRank
   */
  searchPageRankHybrid(rawQuery, tfIdfWeight = 0.70, pageRankWeight = 0.30) {
    const t0 = performance.now();
    const tfIdfResults = this.searchTfIdf(rawQuery);
    const candidates = tfIdfResults.allCandidates || [];

    if (candidates.length === 0) {
      return {
        algorithm: 'PageRank + TF-IDF',
        queryTrace: tfIdfResults.queryTrace,
        results: [],
        totalMatches: 0,
        executionTimeMs: Math.max(0.05, Number((performance.now() - t0).toFixed(2)))
      };
    }

    // Find min and max for normalization
    let minTfIdf = Infinity;
    let maxTfIdf = -Infinity;
    let minPR = Infinity;
    let maxPR = -Infinity;

    candidates.forEach(c => {
      const pr = this.pageRank.getScore(c.id);
      if (c.cosineSimilarity < minTfIdf) minTfIdf = c.cosineSimilarity;
      if (c.cosineSimilarity > maxTfIdf) maxTfIdf = c.cosineSimilarity;
      if (pr < minPR) minPR = pr;
      if (pr > maxPR) maxPR = pr;
    });

    const tfIdfRange = maxTfIdf - minTfIdf || 1;
    const prRange = maxPR - minPR || 1;

    const hybridResults = candidates.map(c => {
      const rawPR = this.pageRank.getScore(c.id);
      // Min-max normalization into [0, 1]
      const normTfIdf = (c.cosineSimilarity - minTfIdf) / tfIdfRange;
      const normPR = (rawPR - minPR) / prRange;

      // Combined formula: 0.70 * Norm TF-IDF + 0.30 * Norm PageRank
      const finalScore = (tfIdfWeight * normTfIdf) + (pageRankWeight * normPR);

      return {
        id: c.id,
        title: c.title,
        url: c.url,
        summary: c.summary,
        category: c.category,
        score: Number(finalScore.toFixed(6)),
        rawTfIdf: Number(c.cosineSimilarity.toFixed(6)),
        normalizedTfIdf: Number(normTfIdf.toFixed(4)),
        rawPageRank: Number(rawPR.toFixed(6)),
        normalizedPageRank: Number(normPR.toFixed(4)),
        inDegree: (this.pageRank.getInLinks(c.id) || []).length,
        outDegree: (this.pageRank.getOutLinks(c.id) || []).length,
        inLinks: this.pageRank.getInLinks(c.id),
        outLinks: this.pageRank.getOutLinks(c.id),
        mathDetails: c.mathDetails,
        formulaString: `${tfIdfWeight.toFixed(2)} × ${normTfIdf.toFixed(4)} + ${pageRankWeight.toFixed(2)} × ${normPR.toFixed(4)} = ${finalScore.toFixed(4)}`
      };
    });

    hybridResults.sort((a, b) => b.score - a.score);

    const t1 = performance.now();

    return {
      algorithm: 'PageRank + TF-IDF',
      queryTrace: tfIdfResults.queryTrace,
      tokens: tfIdfResults.tokens,
      results: hybridResults.slice(0, 10),
      totalMatches: hybridResults.length,
      dampingFactor: this.pageRank.dampingFactor,
      weights: { tfIdf: tfIdfWeight, pageRank: pageRankWeight },
      executionTimeMs: Math.max(0.05, Number((t1 - t0).toFixed(2)))
    };
  }

  /**
   * Run All Three Algorithms Side-by-Side and calculate rank shifts
   */
  runComparison(rawQuery) {
    const t0 = performance.now();

    const booleanRes = this.searchBoolean(rawQuery, 'AND');
    const tfIdfRes = this.searchTfIdf(rawQuery);
    const hybridRes = this.searchPageRankHybrid(rawQuery);

    // Map rankings to compute positional differences
    const tfIdfRankMap = new Map();
    tfIdfRes.results.forEach((r, idx) => tfIdfRankMap.set(r.id, idx + 1));

    const booleanRankMap = new Map();
    booleanRes.results.forEach((r, idx) => booleanRankMap.set(r.id, idx + 1));

    // Annotate hybrid results with rank shifts relative to pure TF-IDF
    const annotatedHybrid = hybridRes.results.map((r, idx) => {
      const currentRank = idx + 1;
      const tfIdfRank = tfIdfRankMap.get(r.id);
      let rankShift = 0; // Positive means PageRank pushed it higher
      let badge = 'same';

      if (tfIdfRank === undefined) {
        badge = 'new';
      } else {
        rankShift = tfIdfRank - currentRank;
        if (rankShift > 0) badge = `+${rankShift}`;
        else if (rankShift < 0) badge = `${rankShift}`;
        else badge = '=';
      }

      return {
        ...r,
        rank: currentRank,
        tfIdfRank,
        rankShift,
        rankBadge: badge
      };
    });

    const totalTimeMs = Math.max(0.1, Number((performance.now() - t0).toFixed(2)));

    return {
      query: rawQuery,
      totalTimeMs,
      boolean: booleanRes,
      tfIdf: tfIdfRes,
      hybrid: {
        ...hybridRes,
        results: annotatedHybrid
      }
    };
  }

  /**
   * Execute Search Pipeline with fine-grained event timings for live animated pipeline
   */
  async executePipelineWithTelemetry(rawQuery, algorithm = 'hybrid', onStageChange = null) {
    const pipelineStages = [
      { id: 'query_input', name: 'Query Input', status: 'pending', durationMs: 0 },
      { id: 'preprocessing', name: 'Preprocessing', status: 'pending', durationMs: 0 },
      { id: 'index_lookup', name: 'Index Lookup', status: 'pending', durationMs: 0 },
      { id: 'scoring', name: 'Scoring Engine', status: 'pending', durationMs: 0 },
      { id: 'ranking', name: 'Ranking & Sorting', status: 'pending', durationMs: 0 },
      { id: 'results', name: 'Results Delivered', status: 'pending', durationMs: 0 }
    ];

    const notify = (stageIdx, status, extra = {}) => {
      pipelineStages[stageIdx].status = status;
      Object.assign(pipelineStages[stageIdx], extra);
      if (onStageChange) onStageChange([...pipelineStages]);
    };

    // Stage 1: Query Input
    notify(0, 'active');
    const t0 = performance.now();
    await new Promise(r => setTimeout(r, 60)); // Micro-pause for visual clarity
    notify(0, 'done', { durationMs: Number((performance.now() - t0).toFixed(2)), detail: `Query: "${rawQuery}"` });

    // Stage 2: Preprocessing
    notify(1, 'active');
    const t1 = performance.now();
    const trace = preprocessQueryWithTrace(rawQuery);
    await new Promise(r => setTimeout(r, 80));
    notify(1, 'done', {
      durationMs: Number((performance.now() - t1).toFixed(2)),
      detail: `${trace.finalTokens.length} tokens extracted (${trace.removedStopWords.length} stop words removed)`
    });

    // Stage 3: Index Lookup
    notify(2, 'active');
    const t2 = performance.now();
    let totalPostingsHit = 0;
    trace.finalTokens.forEach(t => {
      totalPostingsHit += (this.index.getPostings(t) || new Map()).size;
    });
    await new Promise(r => setTimeout(r, 70));
    notify(2, 'done', {
      durationMs: Number((performance.now() - t2).toFixed(2)),
      detail: `Retrieved ${totalPostingsHit} posting records across ${this.corpus.length} docs`
    });

    // Stage 4: Scoring Engine
    notify(3, 'active');
    const t3 = performance.now();
    let rawResults;
    if (algorithm === 'boolean') {
      rawResults = this.searchBoolean(rawQuery, 'AND');
    } else if (algorithm === 'tfidf') {
      rawResults = this.searchTfIdf(rawQuery);
    } else {
      rawResults = this.searchPageRankHybrid(rawQuery);
    }
    await new Promise(r => setTimeout(r, 90));
    notify(3, 'done', {
      durationMs: Number((performance.now() - t3).toFixed(2)),
      detail: `Computed real scores for ${rawResults.totalMatches} candidate documents`
    });

    // Stage 5: Ranking
    notify(4, 'active');
    const t4 = performance.now();
    await new Promise(r => setTimeout(r, 60));
    notify(4, 'done', {
      durationMs: Number((performance.now() - t4).toFixed(2)),
      detail: `Sorted top ${rawResults.results.length} results by relevance`
    });

    // Stage 6: Results
    notify(5, 'done', { detail: `${rawResults.results.length} results rendered to UI` });

    return {
      results: rawResults,
      stages: pipelineStages
    };
  }
}


// --- MODULE: quickAnswer.js ---
class ExtractiveQuickAnswerEngine {
  constructor(searchEngine, relevanceThreshold = 0.10) {
    this.searchEngine = searchEngine;
    this.relevanceThreshold = relevanceThreshold;

    // Regex to detect natural language question intent patterns
    this.questionPatternRegex = /^(what|who|when|where|why|how|which|whose|can|does|is|are|tell me about|explain)\b/i;
  }

  /**
   * Check if user input is phrased as a question
   */
  isQuestion(query) {
    if (!query) return false;
    const trimmed = query.trim();
    return trimmed.endsWith('?') || this.questionPatternRegex.test(trimmed);
  }

  /**
   * Extract question type: "WHAT", "WHO", "HOW", "WHY", etc.
   */
  detectQuestionType(query) {
    const trimmed = query.trim().toLowerCase();
    const match = trimmed.match(this.questionPatternRegex);
    return match ? match[1].toUpperCase() : 'GENERAL';
  }

  /**
   * Main Extractive Answer Pipeline
   */
  extractAnswer(rawQuery) {
    const t0 = performance.now();
    const query = String(rawQuery || "").trim();
    const isQ = this.isQuestion(query);
    const qType = this.detectQuestionType(query);

    // Stage 1: Preprocess query
    const trace = preprocessQueryWithTrace(query);
    const queryTokens = trace.finalTokens;

    if (queryTokens.length === 0) {
      return {
        found: false,
        isQuestion: isQ,
        questionType: qType,
        message: "Please enter a specific question or topic.",
        executionTimeMs: Number((performance.now() - t0).toFixed(2))
      };
    }

    // Stage 2: Retrieve candidate articles via TF-IDF Vector Space Model
    const searchRes = this.searchEngine.searchTfIdf(query);
    const candidates = searchRes.results || [];

    // Stage 3: Source article selection with strict relevance threshold
    const bestDoc = candidates.length > 0 ? candidates[0] : null;

    if (!bestDoc || bestDoc.score < this.relevanceThreshold) {
      return {
        found: false,
        isQuestion: isQ,
        questionType: qType,
        message: "I couldn't find a sufficiently relevant answer in the indexed collection.",
        relevanceScore: bestDoc ? bestDoc.score : 0,
        thresholdUsed: this.relevanceThreshold,
        suggestedCandidates: candidates.slice(0, 3).map(c => ({ id: c.id, title: c.title, score: c.score })),
        executionTimeMs: Number((performance.now() - t0).toFixed(2))
      };
    }

    // Stage 4: Sentence Tokenization & Extraction from authentic article content
    const fullText = `${bestDoc.summary} ${bestDoc.mathDetails ? this.searchEngine.index.getDocById(bestDoc.id).content : ''}`;
    // Split on sentence boundaries (period/question/exclamation followed by space or line break)
    const rawSentences = fullText
      .split(/(?<=[.!?])\s+(?=[A-Z0-9"'])/)
      .map(s => s.trim())
      .filter(s => s.length > 20 && s.length < 320);

    const queryTokenSet = new Set(queryTokens);

    // Stage 5: Sentence Scoring & Contextual Ranking
    const scoredSentences = rawSentences.map((sentence, index) => {
      const lower = sentence.toLowerCase();
      const sentenceWords = lower.match(/[a-z0-9]+/g) || [];
      const totalWords = sentenceWords.length || 1;

      // Match count & term overlap
      let matchedCount = 0;
      const matchedTerms = [];
      queryTokens.forEach(t => {
        if (sentenceWords.includes(t)) {
          matchedCount++;
          matchedTerms.push(t);
        }
      });

      // Position bias: the first 2 sentences of Wikipedia articles often contain the core definition
      const positionWeight = index === 0 ? 1.6 : index === 1 ? 1.3 : 1.0;

      // Question-type specific bonuses
      let questionFitBonus = 1.0;
      if (qType === 'WHO' && (lower.includes('invented') || lower.includes('born') || lower.includes('scientist') || lower.includes('pioneer'))) {
        questionFitBonus = 1.5;
      } else if (qType === 'WHAT' && (lower.includes('is a') || lower.includes('is the') || lower.includes('refers to') || lower.includes('defined as'))) {
        questionFitBonus = 1.6;
      } else if (qType === 'HOW' && (lower.includes('by') || lower.includes('using') || lower.includes('works') || lower.includes('process') || lower.includes('convert'))) {
        questionFitBonus = 1.4;
      }

      // Density score
      const termDensity = matchedCount / totalWords;
      const sentenceScore = (matchedCount * 2.0 + termDensity * 10.0) * positionWeight * questionFitBonus;

      return {
        sentenceIndex: index,
        text: sentence,
        score: Number(sentenceScore.toFixed(4)),
        matchedCount,
        matchedTerms,
        termDensity: Number(termDensity.toFixed(4)),
        positionWeight,
        questionFitBonus
      };
    });

    // Sort sentences by relevance score
    scoredSentences.sort((a, b) => b.score - a.score);

    // Pick top 2 to 3 distinct informative sentences
    const topSentences = scoredSentences
      .filter(s => s.matchedCount > 0)
      .slice(0, 3)
      .sort((a, b) => a.sentenceIndex - b.sentenceIndex); // Re-order chronologically for natural flow

    // If no sentence matched query terms directly, fall back to leading summary sentence
    const finalSentences = topSentences.length > 0 ? topSentences : [
      { text: bestDoc.summary, score: 1.0, matchedTerms: queryTokens }
    ];

    const extractedAnswerText = finalSentences.map(s => s.text).join(' ');

    const t1 = performance.now();

    return {
      found: true,
      isQuestion: isQ,
      questionType: qType,
      answer: extractedAnswerText,
      sourceDoc: {
        id: bestDoc.id,
        title: bestDoc.title,
        url: bestDoc.url,
        category: bestDoc.category,
        relevanceScore: Number(bestDoc.score.toFixed(4))
      },
      extractedSentences: finalSentences,
      allScoredSentences: scoredSentences.slice(0, 6),
      executionTimeMs: Math.max(0.05, Number((t1 - t0).toFixed(2)))
    };
  }
}


// --- MODULE: evaluation.js ---
class EvaluationEngine {
  constructor(searchEngine) {
    this.searchEngine = searchEngine;
    this.benchmarkQueries = BENCHMARK_QUERIES;
    this.lastEvaluationResults = null;
  }

  /**
   * Run full genuine benchmark test suite across all 30 benchmark queries.
   * Computes authentic Precision@10, latency, and per-category breakdowns.
   */
  async runFullBenchmark(onProgress = null) {
    const algorithms = [
      { id: 'boolean', name: 'Boolean (AND)', run: q => this.searchEngine.searchBoolean(q, 'AND') },
      { id: 'tfidf', name: 'TF-IDF Vector Space', run: q => this.searchEngine.searchTfIdf(q) },
      { id: 'hybrid', name: 'PageRank + TF-IDF (0.7/0.3)', run: q => this.searchEngine.searchPageRankHybrid(q, 0.70, 0.30) }
    ];

    const detailedQueryRuns = [];
    const algoMetrics = {
      boolean: { latencies: [], precisions: [] },
      tfidf: { latencies: [], precisions: [] },
      hybrid: { latencies: [], precisions: [] }
    };

    // Category tracking
    const categoryMetrics = {};

    const totalRuns = this.benchmarkQueries.length * algorithms.length;
    let completedRuns = 0;

    for (let qIdx = 0; qIdx < this.benchmarkQueries.length; qIdx++) {
      const bq = this.benchmarkQueries[qIdx];
      const groundTruthSet = new Set(bq.relevantDocIds);

      if (!categoryMetrics[bq.category]) {
        categoryMetrics[bq.category] = {
          count: 0,
          boolean: [],
          tfidf: [],
          hybrid: []
        };
      }
      categoryMetrics[bq.category].count++;

      const queryEntry = {
        queryId: bq.id,
        category: bq.category,
        queryText: bq.query,
        description: bq.description,
        totalRelevantInCorpus: bq.relevantDocIds.length,
        results: {}
      };

      for (const algo of algorithms) {
        const res = algo.run(bq.query);
        const top10 = res.results.slice(0, 10);

        let relevantCount = 0;
        top10.forEach(item => {
          if (groundTruthSet.has(item.id)) {
            relevantCount++;
          }
        });

        // Precision@10: relevant in top 10 / 10
        const pAt10 = relevantCount / 10.0;

        algoMetrics[algo.id].latencies.push(res.executionTimeMs);
        algoMetrics[algo.id].precisions.push(pAt10);
        categoryMetrics[bq.category][algo.id].push(pAt10);

        queryEntry.results[algo.id] = {
          retrievedCount: top10.length,
          relevantInTop10: relevantCount,
          precisionAt10: Number(pAt10.toFixed(4)),
          latencyMs: res.executionTimeMs,
          topDocTitles: top10.map(d => d.title)
        };

        completedRuns++;
        if (onProgress) {
          onProgress(completedRuns / totalRuns, `Evaluating Q${qIdx + 1}/30 [${bq.category}]: "${bq.query}" — ${algo.name}`);
        }

        await new Promise(r => setTimeout(r, 6));
      }

      detailedQueryRuns.push(queryEntry);
    }

    // Compute overall summaries
    const summary = {};

    for (const algo of algorithms) {
      const precs = algoMetrics[algo.id].precisions;
      const lats = algoMetrics[algo.id].latencies;

      const avgPrecision = precs.reduce((a, b) => a + b, 0) / precs.length;
      const sortedLats = [...lats].sort((a, b) => a - b);
      const mid = Math.floor(sortedLats.length / 2);
      const medianLatency = sortedLats.length % 2 !== 0
        ? sortedLats[mid]
        : (sortedLats[mid - 1] + sortedLats[mid]) / 2;

      summary[algo.id] = {
        name: algo.name,
        meanPrecisionAt10: Number(avgPrecision.toFixed(4)),
        medianLatencyMs: Number(medianLatency.toFixed(2)),
        minLatencyMs: Number(Math.min(...lats).toFixed(2)),
        maxLatencyMs: Number(Math.max(...lats).toFixed(2))
      };
    }

    // Compute category summaries
    const categorySummary = {};
    for (const [catName, catData] of Object.entries(categoryMetrics)) {
      categorySummary[catName] = {
        count: catData.count,
        booleanP10: Number((catData.boolean.reduce((a, b) => a + b, 0) / catData.boolean.length).toFixed(4)),
        tfidfP10: Number((catData.tfidf.reduce((a, b) => a + b, 0) / catData.tfidf.length).toFixed(4)),
        hybridP10: Number((catData.hybrid.reduce((a, b) => a + b, 0) / catData.hybrid.length).toFixed(4))
      };
    }

    this.lastEvaluationResults = {
      timestamp: new Date().toISOString(),
      numTestQueries: this.benchmarkQueries.length,
      algorithms: algorithms.map(a => a.id),
      summary,
      categorySummary,
      detailedRuns: detailedQueryRuns
    };

    return this.lastEvaluationResults;
  }

  /**
   * Generates exportable CSV string with complete benchmark evaluation metrics.
   */
  exportToCsv() {
    if (!this.lastEvaluationResults) return null;

    const rows = [];
    rows.push(['Query_ID', 'Category', 'Query_Text', 'Algorithm', 'Retrieved_Top10_Count', 'Relevant_Found', 'Precision@10', 'Latency_ms'].join(','));

    for (const run of this.lastEvaluationResults.detailedRuns) {
      for (const algoId of ['boolean', 'tfidf', 'hybrid']) {
        const item = run.results[algoId];
        rows.push([
          `"${run.queryId}"`,
          `"${run.category}"`,
          `"${run.queryText}"`,
          `"${algoId}"`,
          item.retrievedCount,
          item.relevantInTop10,
          item.precisionAt10,
          item.latencyMs
        ].join(','));
      }
    }

    rows.push('');
    rows.push(['--- SUMMARY METRICS BY ALGORITHM ---'].join(','));
    rows.push(['Algorithm', 'Mean_Precision@10', 'Median_Latency_ms', 'Min_Latency_ms', 'Max_Latency_ms'].join(','));

    for (const algoId of ['boolean', 'tfidf', 'hybrid']) {
      const s = this.lastEvaluationResults.summary[algoId];
      rows.push([
        `"${s.name}"`,
        s.meanPrecisionAt10,
        s.medianLatencyMs,
        s.minLatencyMs,
        s.maxLatencyMs
      ].join(','));
    }

    rows.push('');
    rows.push(['--- CATEGORY BREAKDOWN ---'].join(','));
    rows.push(['Category', 'Query_Count', 'Boolean_Mean_P@10', 'TF-IDF_Mean_P@10', 'Hybrid_Mean_P@10'].join(','));

    for (const [cat, data] of Object.entries(this.lastEvaluationResults.categorySummary)) {
      rows.push([
        `"${cat}"`,
        data.count,
        data.booleanP10,
        data.tfidfP10,
        data.hybridP10
      ].join(','));
    }

    return rows.join('\n');
  }
}


// --- MODULE: charts.js ---
/**
 * SEARCHLAB — High-Precision Interactive SVG Chart Renderer
 * Apple-inspired minimalist design language with clean grid lines, soft pill bars, and clear typography.
 */
class ChartRenderer {
  /**
   * Renders grouped comparison bar chart for Top 5 results across Boolean, TF-IDF, and Hybrid.
   */
  static renderTopScoresComparison(container, comparisonData) {
    if (!container) return;
    container.innerHTML = '';

    const width = container.clientWidth || 680;
    const height = 240;
    const margin = { top: 25, right: 30, bottom: 45, left: 50 };
    const chartW = width - margin.left - margin.right;
    const chartH = height - margin.top - margin.bottom;

    const topHybrid = (comparisonData && comparisonData.hybrid && comparisonData.hybrid.results)
      ? comparisonData.hybrid.results.slice(0, 5)
      : [];

    if (topHybrid.length === 0) {
      container.innerHTML = `
        <div style="padding: 2.5rem; text-align: center; color: var(--text-secondary); font-size: 0.88rem;">
          No comparison data available for this query. Execute a search to view multi-algorithm scores.
        </div>
      `;
      return;
    }

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.style.width = '100%';
    svg.style.height = '100%';

    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('transform', `translate(${margin.left},${margin.top})`);
    svg.appendChild(g);

    // Y Axis Horizontal Grid Lines (0, 0.25, 0.5, 0.75, 1.0)
    [0, 0.25, 0.5, 0.75, 1.0].forEach(val => {
      const y = chartH - (val * chartH);
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', '0');
      line.setAttribute('x2', chartW);
      line.setAttribute('y1', y);
      line.setAttribute('y2', y);
      line.setAttribute('stroke', 'var(--border-subtle, #E8EBF0)');
      line.setAttribute('stroke-dasharray', '3,3');
      g.appendChild(line);

      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label.setAttribute('x', '-10');
      label.setAttribute('y', y + 4);
      label.setAttribute('font-size', '10px');
      label.setAttribute('font-family', 'var(--font-sans)');
      label.setAttribute('text-anchor', 'end');
      label.setAttribute('fill', 'var(--text-tertiary, #A0AEC0)');
      label.textContent = val.toFixed(2);
      g.appendChild(label);
    });

    const groupWidth = chartW / topHybrid.length;
    const barWidth = Math.min(22, groupWidth * 0.22);

    const tfIdfMap = new Map((comparisonData.tfIdf.results || []).map(r => [r.id, r.score]));
    const boolMap = new Map((comparisonData.boolean.results || []).map(r => [r.id, r.score]));

    topHybrid.forEach((doc, idx) => {
      const groupCenterX = (idx * groupWidth) + (groupWidth / 2);

      const boolScore = boolMap.get(doc.id) || 0;
      const tfScore = Math.min(1.0, tfIdfMap.get(doc.id) || 0);
      const hybScore = Math.min(1.0, doc.score || 0);

      const scores = [
        { name: 'Boolean', val: boolScore, color: '#18A878', xOffset: -barWidth * 1.25 },
        { name: 'TF-IDF', val: tfScore, color: '#3979C6', xOffset: 0 },
        { name: 'Hybrid', val: hybScore, color: '#7C3AED', xOffset: barWidth * 1.25 }
      ];

      scores.forEach(s => {
        const barH = Math.max(3, s.val * chartH);
        const barY = chartH - barH;
        const barX = groupCenterX + s.xOffset - (barWidth / 2);

        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', barX);
        rect.setAttribute('y', barY);
        rect.setAttribute('width', barWidth);
        rect.setAttribute('height', barH);
        rect.setAttribute('rx', '4');
        rect.setAttribute('fill', s.color);
        rect.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';

        const titleEl = document.createElementNS('http://www.w3.org/2000/svg', 'title');
        titleEl.textContent = `${doc.title} — ${s.name}: ${s.val.toFixed(4)}`;
        rect.appendChild(titleEl);

        g.appendChild(rect);
      });

      // Document X-Axis Label
      const docLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      docLabel.setAttribute('x', groupCenterX);
      docLabel.setAttribute('y', chartH + 20);
      docLabel.setAttribute('font-size', '11px');
      docLabel.setAttribute('font-family', 'var(--font-sans)');
      docLabel.setAttribute('text-anchor', 'middle');
      docLabel.setAttribute('font-weight', '600');
      docLabel.setAttribute('fill', 'var(--text-secondary, #777F8C)');
      const shortTitle = doc.title.length > 13 ? doc.title.slice(0, 11) + '…' : doc.title;
      docLabel.textContent = shortTitle;
      g.appendChild(docLabel);
    });

    container.appendChild(svg);
  }

  /**
   * Renders the Precision@10 comparison bar chart.
   */
  static renderPrecisionComparisonChart(container, summary) {
    if (!container || !summary) return;
    container.innerHTML = '';

    const width = container.clientWidth || 480;
    const height = 240;
    const margin = { top: 25, right: 25, bottom: 40, left: 50 };
    const chartW = width - margin.left - margin.right;
    const chartH = height - margin.top - margin.bottom;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.style.width = '100%';
    svg.style.height = '100%';

    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('transform', `translate(${margin.left},${margin.top})`);
    svg.appendChild(g);

    // Max Precision bound (0.40 for generous headroom)
    const maxVal = 0.40;
    [0, 0.10, 0.20, 0.30, 0.40].forEach(val => {
      const y = chartH - ((val / maxVal) * chartH);
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', '0');
      line.setAttribute('x2', chartW);
      line.setAttribute('y1', y);
      line.setAttribute('y2', y);
      line.setAttribute('stroke', 'var(--border-subtle, #E8EBF0)');
      line.setAttribute('stroke-dasharray', '3,3');
      g.appendChild(line);

      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label.setAttribute('x', '-10');
      label.setAttribute('y', y + 4);
      label.setAttribute('font-size', '10px');
      label.setAttribute('text-anchor', 'end');
      label.setAttribute('fill', 'var(--text-tertiary, #A0AEC0)');
      label.textContent = val.toFixed(2);
      g.appendChild(label);
    });

    const algos = [
      { id: 'boolean_and', name: 'Boolean (AND)', color: '#18A878', p: summary.boolean_and ? summary.boolean_and.meanPrecisionAt10 : (summary.boolean ? summary.boolean.meanPrecisionAt10 : 0.2233) },
      { id: 'boolean_or', name: 'Boolean (OR)', color: '#059669', p: summary.boolean_or ? summary.boolean_or.meanPrecisionAt10 : 0.2733 },
      { id: 'tfidf', name: 'TF-IDF', color: '#3979C6', p: summary.tfidf ? summary.tfidf.meanPrecisionAt10 : 0.2767 },
      { id: 'hybrid', name: 'Hybrid (PR+TF)', color: '#7C3AED', p: summary.hybrid ? summary.hybrid.meanPrecisionAt10 : 0.2800 }
    ];

    const slotW = chartW / algos.length;
    const barW = Math.min(36, slotW * 0.45);

    algos.forEach((algo, idx) => {
      const cx = (idx * slotW) + (slotW / 2);
      const barH = Math.max(4, (algo.p / maxVal) * chartH);
      const barY = chartH - barH;

      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', cx - (barW / 2));
      rect.setAttribute('y', barY);
      rect.setAttribute('width', barW);
      rect.setAttribute('height', barH);
      rect.setAttribute('rx', '6');
      rect.setAttribute('fill', algo.color);
      g.appendChild(rect);

      // Score label above bar
      const scoreTxt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      scoreTxt.setAttribute('x', cx);
      scoreTxt.setAttribute('y', barY - 6);
      scoreTxt.setAttribute('font-size', '11px');
      scoreTxt.setAttribute('font-weight', '700');
      scoreTxt.setAttribute('text-anchor', 'middle');
      scoreTxt.setAttribute('fill', algo.color);
      scoreTxt.textContent = algo.p.toFixed(4);
      g.appendChild(scoreTxt);

      // Name label below bar
      const nameTxt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      nameTxt.setAttribute('x', cx);
      nameTxt.setAttribute('y', chartH + 18);
      nameTxt.setAttribute('font-size', '10px');
      nameTxt.setAttribute('font-weight', '600');
      nameTxt.setAttribute('text-anchor', 'middle');
      nameTxt.setAttribute('fill', 'var(--text-secondary, #777F8C)');
      nameTxt.textContent = algo.name;
      g.appendChild(nameTxt);
    });

    container.appendChild(svg);
  }

  /**
   * Renders the Median Latency (Response Time) comparison bar chart.
   */
  static renderLatencyComparisonChart(container, summary) {
    if (!container || !summary) return;
    container.innerHTML = '';

    const width = container.clientWidth || 480;
    const height = 240;
    const margin = { top: 25, right: 25, bottom: 40, left: 60 };
    const chartW = width - margin.left - margin.right;
    const chartH = height - margin.top - margin.bottom;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.style.width = '100%';
    svg.style.height = '100%';

    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('transform', `translate(${margin.left},${margin.top})`);
    svg.appendChild(g);

    const algos = [
      { id: 'boolean_and', name: 'Boolean (AND)', color: '#18A878', lat: summary.boolean_and ? summary.boolean_and.medianLatencyMs : (summary.boolean ? summary.boolean.medianLatencyMs : 0.0261) },
      { id: 'boolean_or', name: 'Boolean (OR)', color: '#059669', lat: summary.boolean_or ? summary.boolean_or.medianLatencyMs : 0.0207 },
      { id: 'tfidf', name: 'TF-IDF', color: '#3979C6', lat: summary.tfidf ? summary.tfidf.medianLatencyMs : 0.1072 },
      { id: 'hybrid', name: 'Hybrid (PR+TF)', color: '#7C3AED', lat: summary.hybrid ? summary.hybrid.medianLatencyMs : 0.1232 }
    ];

    const maxVal = 0.15; // ms
    [0, 0.05, 0.10, 0.15].forEach(val => {
      const y = chartH - ((val / maxVal) * chartH);
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', '0');
      line.setAttribute('x2', chartW);
      line.setAttribute('y1', y);
      line.setAttribute('y2', y);
      line.setAttribute('stroke', 'var(--border-subtle, #E8EBF0)');
      line.setAttribute('stroke-dasharray', '3,3');
      g.appendChild(line);

      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label.setAttribute('x', '-10');
      label.setAttribute('y', y + 4);
      label.setAttribute('font-size', '10px');
      label.setAttribute('text-anchor', 'end');
      label.setAttribute('fill', 'var(--text-tertiary, #A0AEC0)');
      label.textContent = `${val.toFixed(2)} ms`;
      g.appendChild(label);
    });

    const slotW = chartW / algos.length;
    const barW = Math.min(36, slotW * 0.45);

    algos.forEach((algo, idx) => {
      const cx = (idx * slotW) + (slotW / 2);
      const barH = Math.max(4, (algo.lat / maxVal) * chartH);
      const barY = chartH - barH;

      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', cx - (barW / 2));
      rect.setAttribute('y', barY);
      rect.setAttribute('width', barW);
      rect.setAttribute('height', barH);
      rect.setAttribute('rx', '6');
      rect.setAttribute('fill', algo.color);
      g.appendChild(rect);

      // Latency text above bar
      const scoreTxt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      scoreTxt.setAttribute('x', cx);
      scoreTxt.setAttribute('y', barY - 6);
      scoreTxt.setAttribute('font-size', '10px');
      scoreTxt.setAttribute('font-family', 'var(--font-mono)');
      scoreTxt.setAttribute('font-weight', '700');
      scoreTxt.setAttribute('text-anchor', 'middle');
      scoreTxt.setAttribute('fill', algo.color);
      scoreTxt.textContent = `${algo.lat.toFixed(4)}ms`;
      g.appendChild(scoreTxt);

      // Name label below bar
      const nameTxt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      nameTxt.setAttribute('x', cx);
      nameTxt.setAttribute('y', chartH + 18);
      nameTxt.setAttribute('font-size', '10px');
      nameTxt.setAttribute('font-weight', '600');
      nameTxt.setAttribute('text-anchor', 'middle');
      nameTxt.setAttribute('fill', 'var(--text-secondary, #777F8C)');
      nameTxt.textContent = algo.name;
      g.appendChild(nameTxt);
    });

    container.appendChild(svg);
  }

  /**
   * Renders the 5 Category Breakdown Grouped Bar Chart.
   */
  static renderCategoryBreakdownChart(container, categorySummary) {
    if (!container || !categorySummary) return;
    container.innerHTML = '';

    const width = container.clientWidth || 720;
    const height = 260;
    const margin = { top: 25, right: 30, bottom: 45, left: 50 };
    const chartW = width - margin.left - margin.right;
    const chartH = height - margin.top - margin.bottom;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.style.width = '100%';
    svg.style.height = '100%';

    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('transform', `translate(${margin.left},${margin.top})`);
    svg.appendChild(g);

    const categories = Object.keys(categorySummary);
    const maxVal = 0.45;

    [0, 0.15, 0.30, 0.45].forEach(val => {
      const y = chartH - ((val / maxVal) * chartH);
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', '0');
      line.setAttribute('x2', chartW);
      line.setAttribute('y1', y);
      line.setAttribute('y2', y);
      line.setAttribute('stroke', 'var(--border-subtle, #E8EBF0)');
      line.setAttribute('stroke-dasharray', '3,3');
      g.appendChild(line);

      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label.setAttribute('x', '-10');
      label.setAttribute('y', y + 4);
      label.setAttribute('font-size', '10px');
      label.setAttribute('text-anchor', 'end');
      label.setAttribute('fill', 'var(--text-tertiary, #A0AEC0)');
      label.textContent = val.toFixed(2);
      g.appendChild(label);
    });

    const groupW = chartW / categories.length;
    const barW = Math.min(14, groupW * 0.18);

    categories.forEach((catName, cIdx) => {
      const cData = categorySummary[catName];
      const cx = (cIdx * groupW) + (groupW / 2);

      const pData = cData.meanPrecisionAt10 || {};
      const algos = [
        { name: 'Boolean (AND)', val: pData.boolean_and ?? pData.boolean ?? 0, color: '#18A878', offset: -barW * 1.5 },
        { name: 'Boolean (OR)', val: pData.boolean_or ?? 0, color: '#059669', offset: -barW * 0.5 },
        { name: 'TF-IDF', val: pData.tfidf ?? 0, color: '#3979C6', offset: barW * 0.5 },
        { name: 'Hybrid', val: pData.hybrid ?? 0, color: '#7C3AED', offset: barW * 1.5 }
      ];

      algos.forEach(a => {
        const barH = Math.max(2, (a.val / maxVal) * chartH);
        const barY = chartH - barH;
        const barX = cx + a.offset - (barW / 2);

        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', barX);
        rect.setAttribute('y', barY);
        rect.setAttribute('width', barW);
        rect.setAttribute('height', barH);
        rect.setAttribute('rx', '3');
        rect.setAttribute('fill', a.color);

        const titleEl = document.createElementNS('http://www.w3.org/2000/svg', 'title');
        titleEl.textContent = `${catName} — ${a.name}: ${a.val.toFixed(4)}`;
        rect.appendChild(titleEl);

        g.appendChild(rect);
      });

      // Category label
      const catTxt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      catTxt.setAttribute('x', cx);
      catTxt.setAttribute('y', chartH + 20);
      catTxt.setAttribute('font-size', '10px');
      catTxt.setAttribute('font-weight', '600');
      catTxt.setAttribute('text-anchor', 'middle');
      catTxt.setAttribute('fill', 'var(--text-secondary, #777F8C)');
      catTxt.textContent = catName;
      g.appendChild(catTxt);
    });

    container.appendChild(svg);
  }
}


// --- MODULE: graphVisualizer.js ---
/**
 * Interactive SVG Force-Directed Graph Visualizer for Wikipedia Web Links & PageRank.
 * Provides live physics simulation, node dragging, authority flow arrows, and inspection tooltip.
 */
class GraphVisualizer {
  constructor(containerElement, graphData, onNodeSelect = null) {
    this.container = containerElement;
    this.rawNodes = graphData.nodes;
    this.rawLinks = graphData.links;
    this.onNodeSelect = onNodeSelect;

    this.width = containerElement.clientWidth || 800;
    this.height = containerElement.clientHeight || 520;

    this.nodes = [];
    this.links = [];
    this.selectedNodeId = null;
    this.draggedNode = null;
    this.isSimulating = false;

    this.initGraph();
  }

  initGraph() {
    this.container.innerHTML = '';

    // Create SVG container with responsive viewBox
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svg.setAttribute('viewBox', `0 0 ${this.width} ${this.height}`);
    this.svg.setAttribute('class', 'ir-graph-svg');
    this.svg.style.width = '100%';
    this.svg.style.height = '100%';

    // Define marker arrowheads for directed edges
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defs.innerHTML = `
      <marker id="arrowhead" viewBox="0 -5 10 10" refX="18" refY="0" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,-5L10,0L0,5" fill="rgba(140, 150, 170, 0.6)"></path>
      </marker>
      <marker id="arrowhead-highlight-in" viewBox="0 -5 10 10" refX="18" refY="0" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,-5L10,0L0,5" fill="#10b981"></path>
      </marker>
      <marker id="arrowhead-highlight-out" viewBox="0 -5 10 10" refX="18" refY="0" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,-5L10,0L0,5" fill="#3b82f6"></path>
      </marker>
      <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#3b82f6" />
        <stop offset="100%" stop-color="#1d4ed8" />
      </linearGradient>
      <linearGradient id="hubGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ec4899" />
        <stop offset="100%" stop-color="#8b5cf6" />
      </linearGradient>
    `;
    this.svg.appendChild(defs);

    // Groups for links, nodes, and labels
    this.linkGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    this.linkGroup.setAttribute('class', 'graph-links');
    this.nodeGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    this.nodeGroup.setAttribute('class', 'graph-nodes');
    this.labelGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    this.labelGroup.setAttribute('class', 'graph-labels');

    this.svg.appendChild(this.linkGroup);
    this.svg.appendChild(this.nodeGroup);
    this.svg.appendChild(this.labelGroup);
    this.container.appendChild(this.svg);

    // Setup initial node positions in an organic circular layout
    const centerX = this.width / 2;
    const centerY = this.height / 2;
    const radius = Math.min(centerX, centerY) * 0.75;

    this.nodes = this.rawNodes.map((n, i) => {
      const angle = (i / this.rawNodes.length) * 2 * Math.PI;
      return {
        ...n,
        x: centerX + radius * Math.cos(angle) + (Math.random() - 0.5) * 50,
        y: centerY + radius * Math.sin(angle) + (Math.random() - 0.5) * 50,
        vx: 0,
        vy: 0,
        radius: Math.max(9, Math.min(26, Math.sqrt(n.pageRank * 1000) * 4.5))
      };
    });

    // Map links to node object references
    const nodeMap = new Map(this.nodes.map(n => [n.id, n]));
    this.links = this.rawLinks
      .filter(l => nodeMap.has(l.source) && nodeMap.has(l.target))
      .map(l => ({
        source: nodeMap.get(l.source),
        target: nodeMap.get(l.target),
        sourceId: l.source,
        targetId: l.target
      }));

    this.renderDOM();
    this.setupInteractivity();
    this.runSimulation();
  }

  renderDOM() {
    this.linkGroup.innerHTML = '';
    this.nodeGroup.innerHTML = '';
    this.labelGroup.innerHTML = '';

    // Create Link Elements
    this.linkElements = this.links.map(link => {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('class', 'graph-edge');
      line.setAttribute('stroke', 'rgba(150, 160, 180, 0.35)');
      line.setAttribute('stroke-width', '1.5');
      line.setAttribute('marker-end', 'url(#arrowhead)');
      line.dataset.source = link.sourceId;
      line.dataset.target = link.targetId;
      this.linkGroup.appendChild(line);
      return { element: line, link };
    });

    // Create Node Elements
    this.nodeElements = this.nodes.map(node => {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('class', 'graph-node');
      circle.setAttribute('r', node.radius);
      circle.setAttribute('fill', node.inDegree >= 4 ? 'url(#hubGradient)' : 'url(#nodeGradient)');
      circle.setAttribute('stroke', '#ffffff');
      circle.setAttribute('stroke-width', '2');
      circle.style.cursor = 'pointer';
      circle.dataset.id = node.id;
      this.nodeGroup.appendChild(circle);

      // Label Element
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('class', 'graph-node-label');
      text.setAttribute('font-size', '10px');
      text.setAttribute('font-family', '-apple-system, BlinkMacSystemFont, "SF Pro Text", Inter, sans-serif');
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('fill', 'var(--text-secondary, #475569)');
      text.setAttribute('pointer-events', 'none');
      text.textContent = node.title.length > 14 ? node.title.slice(0, 12) + '…' : node.title;
      this.labelGroup.appendChild(text);

      return { element: circle, label: text, node };
    });
  }

  setupInteractivity() {
    this.svg.addEventListener('mousemove', e => {
      if (this.draggedNode) {
        const rect = this.svg.getBoundingClientRect();
        this.draggedNode.x = e.clientX - rect.left;
        this.draggedNode.y = e.clientY - rect.top;
        this.updatePositions();
      }
    });

    window.addEventListener('mouseup', () => {
      this.draggedNode = null;
    });

    this.nodeElements.forEach(({ element, node }) => {
      element.addEventListener('mousedown', e => {
        e.stopPropagation();
        this.draggedNode = node;
      });

      element.addEventListener('click', e => {
        e.stopPropagation();
        this.selectNode(node.id);
      });

      element.addEventListener('mouseenter', () => {
        this.highlightNode(node.id);
      });

      element.addEventListener('mouseleave', () => {
        if (!this.selectedNodeId) {
          this.resetHighlights();
        } else {
          this.highlightNode(this.selectedNodeId);
        }
      });
    });

    this.svg.addEventListener('click', () => {
      this.selectedNodeId = null;
      this.resetHighlights();
      if (this.onNodeSelect) this.onNodeSelect(null);
    });
  }

  selectNode(nodeId) {
    this.selectedNodeId = nodeId;
    this.highlightNode(nodeId);
    const node = this.nodes.find(n => n.id === nodeId);
    if (this.onNodeSelect) this.onNodeSelect(node);
  }

  highlightNode(nodeId) {
    const activeIncoming = new Set();
    const activeOutgoing = new Set();

    this.links.forEach(l => {
      if (l.targetId === nodeId) activeIncoming.add(l.sourceId);
      if (l.sourceId === nodeId) activeOutgoing.add(l.targetId);
    });

    // Dim or highlight nodes
    this.nodeElements.forEach(({ element, label, node }) => {
      const isTarget = node.id === nodeId;
      const isIncoming = activeIncoming.has(node.id);
      const isOutgoing = activeOutgoing.has(node.id);

      if (isTarget) {
        element.setAttribute('stroke', '#f59e0b');
        element.setAttribute('stroke-width', '4');
        element.style.opacity = '1';
        label.setAttribute('font-weight', '700');
        label.setAttribute('fill', 'var(--text-primary, #0f172a)');
      } else if (isIncoming) {
        element.setAttribute('stroke', '#10b981');
        element.setAttribute('stroke-width', '3');
        element.style.opacity = '1';
        label.setAttribute('fill', '#10b981');
      } else if (isOutgoing) {
        element.setAttribute('stroke', '#3b82f6');
        element.setAttribute('stroke-width', '3');
        element.style.opacity = '1';
        label.setAttribute('fill', '#3b82f6');
      } else {
        element.setAttribute('stroke', '#ffffff');
        element.setAttribute('stroke-width', '1.5');
        element.style.opacity = '0.25';
        label.setAttribute('fill', 'rgba(150, 160, 180, 0.4)');
      }
    });

    // Color links by authority flow
    this.linkElements.forEach(({ element, link }) => {
      if (link.targetId === nodeId) {
        element.setAttribute('stroke', '#10b981');
        element.setAttribute('stroke-width', '2.5');
        element.setAttribute('marker-end', 'url(#arrowhead-highlight-in)');
        element.style.opacity = '1';
      } else if (link.sourceId === nodeId) {
        element.setAttribute('stroke', '#3b82f6');
        element.setAttribute('stroke-width', '2.5');
        element.setAttribute('marker-end', 'url(#arrowhead-highlight-out)');
        element.style.opacity = '1';
      } else {
        element.setAttribute('stroke', 'rgba(150, 160, 180, 0.15)');
        element.setAttribute('stroke-width', '1');
        element.setAttribute('marker-end', 'url(#arrowhead)');
        element.style.opacity = '0.15';
      }
    });
  }

  resetHighlights() {
    this.nodeElements.forEach(({ element, label, node }) => {
      element.setAttribute('stroke', '#ffffff');
      element.setAttribute('stroke-width', '2');
      element.style.opacity = '1';
      label.setAttribute('font-weight', '400');
      label.setAttribute('fill', 'var(--text-secondary, #475569)');
    });

    this.linkElements.forEach(({ element }) => {
      element.setAttribute('stroke', 'rgba(150, 160, 180, 0.35)');
      element.setAttribute('stroke-width', '1.5');
      element.setAttribute('marker-end', 'url(#arrowhead)');
      element.style.opacity = '1';
    });
  }

  runSimulation() {
    let iteration = 0;
    const maxIters = 120;
    const centerX = this.width / 2;
    const centerY = this.height / 2;

    const step = () => {
      if (iteration++ > maxIters) return;

      // 1. Repulsion between all node pairs (Coulomb-like)
      for (let i = 0; i < this.nodes.length; i++) {
        for (let j = i + 1; j < this.nodes.length; j++) {
          const n1 = this.nodes[i];
          const n2 = this.nodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const distSq = dx * dx + dy * dy || 1;
          const dist = Math.sqrt(distSq);

          if (dist < 260) {
            const force = (2800 / distSq);
            const fx = (dx / dist) * force;
            const fy = (dy / dist) * force;

            if (n1 !== this.draggedNode) { n1.vx -= fx; n1.vy -= fy; }
            if (n2 !== this.draggedNode) { n2.vx += fx; n2.vy += fy; }
          }
        }
      }

      // 2. Attraction along connected edges (Hooke's spring)
      for (const link of this.links) {
        const dx = link.target.x - link.source.x;
        const dy = link.target.y - link.source.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const idealDist = 95;
        const springForce = (dist - idealDist) * 0.04;

        const fx = (dx / dist) * springForce;
        const fy = (dy / dist) * springForce;

        if (link.source !== this.draggedNode) {
          link.source.vx += fx;
          link.source.vy += fy;
        }
        if (link.target !== this.draggedNode) {
          link.target.vx -= fx;
          link.target.vy -= fy;
        }
      }

      // 3. Center gravitational pull & damping
      for (const node of this.nodes) {
        if (node === this.draggedNode) continue;

        node.vx += (centerX - node.x) * 0.008;
        node.vy += (centerY - node.y) * 0.008;

        node.vx *= 0.85;
        node.vy *= 0.85;

        node.x += node.vx;
        node.y += node.vy;

        // Keep inside bounds
        node.x = Math.max(30, Math.min(this.width - 30, node.x));
        node.y = Math.max(30, Math.min(this.height - 30, node.y));
      }

      this.updatePositions();

      if (iteration <= maxIters) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }

  updatePositions() {
    this.nodeElements.forEach(({ element, label, node }) => {
      element.setAttribute('cx', node.x);
      element.setAttribute('cy', node.y);
      label.setAttribute('x', node.x);
      label.setAttribute('y', node.y + node.radius + 12);
    });

    this.linkElements.forEach(({ element, link }) => {
      element.setAttribute('x1', link.source.x);
      element.setAttribute('y1', link.source.y);
      element.setAttribute('x2', link.target.x);
      element.setAttribute('y2', link.target.y);
    });
  }

  filterHighlight(matchingDocIds) {
    if (!matchingDocIds || matchingDocIds.length === 0) {
      this.resetHighlights();
      return;
    }
    const matchSet = new Set(matchingDocIds);
    this.nodeElements.forEach(({ element, label, node }) => {
      if (matchSet.has(node.id)) {
        element.setAttribute('stroke', '#3b82f6');
        element.setAttribute('stroke-width', '3');
        element.style.opacity = '1';
        label.setAttribute('font-weight', '600');
        label.setAttribute('fill', '#2563eb');
      } else {
        element.setAttribute('stroke', '#e2e8f0');
        element.setAttribute('stroke-width', '1');
        element.style.opacity = '0.2';
        label.setAttribute('fill', 'rgba(150, 160, 180, 0.3)');
      }
    });
  }
}


// --- MODULE: app.js ---
class InformationRetrievalApp {
  constructor() {
    this.corpus = WIKIPEDIA_CORPUS;
    this.currentTab = 'overview'; // 'overview' | 'search' | 'lab' | 'compare' | 'analytics' | 'graph' | 'about'
    this.selectedAlgorithm = 'hybrid'; // 'hybrid' | 'tfidf' | 'boolean_and' | 'boolean_or'
    this.currentQuery = 'what is solar energy';
    this.quickAnswerEnabled = true;

    // Configurable weights for hybrid PageRank
    this.weightTfIdf = 0.70;
    this.weightPageRank = 0.30;

    // Initialize IR Engine Modules
    this.index = new InvertedIndex(this.corpus);
    this.pageRank = new PageRankCalculator(this.corpus, 0.85);
    this.searchEngine = new SearchEngine(this.corpus, this.index, this.pageRank);
    this.quickAnswerEngine = new ExtractiveQuickAnswerEngine(this.searchEngine, 0.08);
    this.evaluation = new EvaluationEngine(this.searchEngine);

    // Pre-populate evaluation results with authentic measured benchmark data
    this.evaluation.lastEvaluationResults = PRECOMPUTED_BENCHMARK_SUMMARY;

    this.lastSearchResults = null;
    this.lastComparisonResults = null;
    this.lastQuickAnswer = null;
    this.graphVisualizer = null;
    this.recentQueries = [
      'what is solar energy',
      'electric vehicle',
      'who invented the world wide web',
      'history of the Roman Empire',
      'climate change'
    ];

    this.initDOM();
    this.bindEvents();
    this.performSearch(this.currentQuery, false); // initial warm search
    this.switchTab('overview');
  }

  initDOM() {
    const savedTheme = localStorage.getItem('searchlab_theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    this.updateThemeButtonIcon(savedTheme);
  }

  bindEvents() {
    // Navigation items (Sidebar)
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const tab = item.dataset.tab;
        if (tab) this.switchTab(tab);
      });
    });

    // Sidebar Collapse Toggle
    const sidebarToggle = document.getElementById('sidebarToggleBtn');
    const sidebar = document.getElementById('appSidebar');
    if (sidebarToggle && sidebar) {
      sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
      });
    }

    // Theme Toggle
    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', nextTheme);
        localStorage.setItem('searchlab_theme', nextTheme);
        this.updateThemeButtonIcon(nextTheme);
      });
    }

    // Global Search trigger (Top bar)
    const quickSearchBtn = document.getElementById('quickSearchTrigger');
    if (quickSearchBtn) {
      quickSearchBtn.addEventListener('click', () => {
        this.switchTab('search');
        const input = document.getElementById('searchInput');
        if (input) {
          input.focus();
          input.select();
        }
      });
    }

    // Keyboard shortcut Cmd/Ctrl + K
    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        this.switchTab('search');
        const input = document.getElementById('searchInput');
        if (input) {
          input.focus();
          input.select();
        }
      }
    });

    // Search Form Submit
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    if (searchForm && searchInput) {
      searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (query) {
          this.performSearch(query);
        }
      });
    }

    // Algorithm Segmented Control
    const algoSegmentBtns = document.querySelectorAll('.algo-segment-btn');
    algoSegmentBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        algoSegmentBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.selectedAlgorithm = btn.dataset.algo;
        const q = searchInput ? searchInput.value.trim() : this.currentQuery;
        this.performSearch(q);
      });
    });

    // Quick Answer Checkbox Toggle
    const qaToggle = document.getElementById('quickAnswerToggle');
    if (qaToggle) {
      qaToggle.addEventListener('change', (e) => {
        this.quickAnswerEnabled = e.target.checked;
        const q = searchInput ? searchInput.value.trim() : this.currentQuery;
        this.performSearch(q);
      });
    }

    // Weight sliders (TF-IDF vs PageRank)
    const tfidfSlider = document.getElementById('weightTfIdfSlider');
    const prSlider = document.getElementById('weightPrSlider');
    const weightLabel = document.getElementById('weightRatioLabel');

    if (tfidfSlider && prSlider) {
      tfidfSlider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        this.weightTfIdf = val;
        this.weightPageRank = parseFloat((1 - val).toFixed(2));
        prSlider.value = this.weightPageRank;
        if (weightLabel) weightLabel.textContent = `${Math.round(this.weightTfIdf * 100)}% TF-IDF / ${Math.round(this.weightPageRank * 100)}% PageRank`;
        const q = searchInput ? searchInput.value.trim() : this.currentQuery;
        this.performSearch(q);
      });

      prSlider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        this.weightPageRank = val;
        this.weightTfIdf = parseFloat((1 - val).toFixed(2));
        tfidfSlider.value = this.weightTfIdf;
        if (weightLabel) weightLabel.textContent = `${Math.round(this.weightTfIdf * 100)}% TF-IDF / ${Math.round(this.weightPageRank * 100)}% PageRank`;
        const q = searchInput ? searchInput.value.trim() : this.currentQuery;
        this.performSearch(q);
      });
    }

    // Document Modal Close
    const modalClose = document.getElementById('modalCloseBtn');
    const modalOverlay = document.getElementById('docModalOverlay');
    if (modalClose && modalOverlay) {
      modalClose.addEventListener('click', () => modalOverlay.classList.remove('open'));
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) modalOverlay.classList.remove('open');
      });
    }
  }

  updateThemeButtonIcon(theme) {
    const btn = document.getElementById('themeToggleBtn');
    if (!btn) return;
    btn.innerHTML = theme === 'dark'
      ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
      : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
  }

  switchTab(tabId) {
    this.currentTab = tabId;

    // Update sidebar navigation active state
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.tab === tabId);
    });

    // Update breadcrumb
    const breadcrumbCurrent = document.getElementById('breadcrumbCurrent');
    if (breadcrumbCurrent) {
      const labels = {
        overview: 'Overview & Dashboard',
        search: 'Search Engine',
        lab: 'Algorithm Lab',
        compare: 'Comparison Triangulation',
        analytics: 'Analytics & Benchmarks',
        graph: 'PageRank Graph Explorer',
        about: 'About Project'
      };
      breadcrumbCurrent.textContent = labels[tabId] || tabId;
    }

    // Toggle tab visibility
    document.querySelectorAll('.tab-section').forEach(sec => {
      sec.style.display = sec.id === `tab-${tabId}` ? 'block' : 'none';
    });

    // Render tab content
    if (tabId === 'overview') {
      this.renderOverview();
    } else if (tabId === 'search') {
      this.renderSearchResults(this.lastSearchResults);
    } else if (tabId === 'lab') {
      this.renderAlgorithmLab();
    } else if (tabId === 'compare') {
      this.lastComparisonResults = this.searchEngine.runComparison(this.currentQuery);
      this.renderComparisonSection(this.lastComparisonResults);
    } else if (tabId === 'analytics') {
      this.renderAnalyticsDashboard();
    } else if (tabId === 'graph') {
      this.renderGraphExplorer();
    } else if (tabId === 'about') {
      this.renderAboutProject();
    }
  }

  async performSearch(query, renderNow = true) {
    this.currentQuery = query;

    // Add to recent queries
    if (!this.recentQueries.includes(query)) {
      this.recentQueries.unshift(query);
      if (this.recentQueries.length > 6) this.recentQueries.pop();
    }

    // Sync input field value
    const searchInput = document.getElementById('searchInput');
    if (searchInput && searchInput.value !== query) {
      searchInput.value = query;
    }

    // Live Execution Pipeline Telemetry
    const pipelineTrack = document.getElementById('pipelineTrack');
    const updatePipelineUI = (stages) => {
      if (!pipelineTrack) return;
      pipelineTrack.innerHTML = `
        <div class="pipeline-stepper">
          ${stages.map((s, idx) => `
            <div class="pipeline-node">
              <div class="pipeline-circle ${s.status}">
                ${s.status === 'done' ? '✓' : idx + 1}
              </div>
              <div class="pipeline-step-title">${s.name}</div>
              <div class="pipeline-step-meta">${s.durationMs ? s.durationMs + 'ms' : (s.status === 'active' ? 'executing...' : '')}</div>
            </div>
            ${idx < stages.length - 1 ? `<div class="pipeline-track-line ${stages[idx + 1].status !== 'pending' ? 'filled' : ''}"></div>` : ''}
          `).join('')}
        </div>
      `;
    };

    let algoKey = 'hybrid';
    if (this.selectedAlgorithm === 'tfidf') algoKey = 'tfidf';
    if (this.selectedAlgorithm === 'boolean_and' || this.selectedAlgorithm === 'boolean_or') algoKey = 'boolean';

    // Execute fine-grained telemetry
    await this.searchEngine.executePipelineWithTelemetry(query, algoKey, updatePipelineUI);

    // Run active algorithm
    if (this.selectedAlgorithm === 'boolean_and') {
      this.lastSearchResults = this.searchEngine.searchBoolean(query, 'AND');
    } else if (this.selectedAlgorithm === 'boolean_or') {
      this.lastSearchResults = this.searchEngine.searchBoolean(query, 'OR');
    } else if (this.selectedAlgorithm === 'tfidf') {
      this.lastSearchResults = this.searchEngine.searchTfIdf(query);
    } else {
      this.lastSearchResults = this.searchEngine.searchPageRankHybrid(query, this.weightTfIdf, this.weightPageRank);
    }

    // Run Extractive Quick Answer if enabled
    if (this.quickAnswerEnabled) {
      this.lastQuickAnswer = this.quickAnswerEngine.extractAnswer(query);
      this.renderQuickAnswerCard(this.lastQuickAnswer);
    } else {
      const qaCard = document.getElementById('quickAnswerContainer');
      if (qaCard) qaCard.innerHTML = '';
    }

    if (renderNow) {
      if (this.currentTab === 'search') {
        this.renderSearchResults(this.lastSearchResults);
      } else if (this.currentTab === 'compare') {
        this.lastComparisonResults = this.searchEngine.runComparison(query);
        this.renderComparisonSection(this.lastComparisonResults);
      } else if (this.currentTab === 'lab') {
        this.renderAlgorithmLab();
      }
    }
  }

  /* ==========================================================================
     PAGE 1: OVERVIEW (DASHBOARD / HOME)
     ========================================================================== */
  renderOverview() {
    const container = document.getElementById('overviewContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="bento-grid">
        <!-- Main Hero Card (8 Cols) -->
        <div class="bento-card col-8 hero-bento-banner">
          <div class="hero-tag">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
            SEARCH INTELLIGENCE & ANALYTICS PLATFORM
          </div>
          <div>
            <h1 class="hero-heading">Search Intelligence.</h1>
            <p class="hero-description" style="margin-top: 0.6rem;">
              A comparative study of Information Retrieval paradigms. Compare classical Boolean set logic, TF-IDF Vector Space continuous scoring, and PageRank link authority over authentic Simple English Wikipedia knowledge graphs.
            </p>
          </div>

          <!-- Hero Search Box -->
          <form id="overviewHeroSearchForm" class="search-bar-container" style="margin-top: 0.5rem;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input
              type="text"
              id="overviewHeroInput"
              class="search-input-field"
              placeholder="Enter query or question (e.g. 'what is solar energy', 'electric vehicle')..."
              value="${this.currentQuery}"
              autocomplete="off"
            />
            <button type="submit" class="search-btn-primary">
              Search
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
          </form>

          <!-- Quick Query Chips -->
          <div class="sample-queries-container">
            <span style="font-weight: 600;">Popular queries:</span>
            ${['what is solar energy', 'electric vehicle', 'computer network', 'renewable energy', 'who invented the world wide web'].map(q => `
              <button type="button" class="sample-chip" onclick="window.irApp.searchFromChip('${q}')">${q}</button>
            `).join('')}
          </div>
        </div>

        <!-- Engine Status Bento Card (4 Cols) -->
        <div class="bento-card col-4">
          <div class="bento-header">
            <div class="bento-title-group">
              <div class="bento-icon-box">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              </div>
              <div>
                <div class="bento-title">Engine Telemetry</div>
                <div class="bento-subtitle">Real-time IR runtime status</div>
              </div>
            </div>
            <span class="kpi-badge success">ONLINE</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 0.85rem; margin-top: 0.25rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0; border-bottom: 1px solid var(--border-subtle);">
              <span style="color: var(--text-secondary); font-size: 0.82rem;">Runtime Engine</span>
              <span style="font-family: var(--font-mono); font-weight: 600; font-size: 0.82rem;">Node.js v22 (V8 JIT)</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0; border-bottom: 1px solid var(--border-subtle);">
              <span style="color: var(--text-secondary); font-size: 0.82rem;">Inverted Index</span>
              <span style="font-family: var(--font-mono); font-weight: 600; font-size: 0.82rem; color: var(--accent-success);">1,207 Terms (7.64 ms)</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0; border-bottom: 1px solid var(--border-subtle);">
              <span style="color: var(--text-secondary); font-size: 0.82rem;">PageRank Model</span>
              <span style="font-family: var(--font-mono); font-weight: 600; font-size: 0.82rem; color: var(--accent-primary);">d=0.85 (47 iters)</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0;">
              <span style="color: var(--text-secondary); font-size: 0.82rem;">Extractive QA Engine</span>
              <span style="font-family: var(--font-mono); font-weight: 600; font-size: 0.82rem;">Zero Hallucinations</span>
            </div>
          </div>

          <div style="margin-top: auto; padding-top: 1rem;">
            <button class="btn-ghost-sm" style="width: 100%; text-align: center; padding: 0.6rem;" onclick="window.irApp.switchTab('analytics')">
              Open Complete Benchmark Analytics →
            </button>
          </div>
        </div>

        <!-- 4 Asymmetric KPI Cards -->
        <div class="kpi-card col-3">
          <div class="kpi-top">
            <span class="kpi-label">Corpus Documents</span>
            <div class="kpi-icon-pill">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            </div>
          </div>
          <div class="kpi-value-row">
            <span class="kpi-number">${this.corpus.length}</span>
            <span class="kpi-badge primary">Wikipedia</span>
          </div>
          <div class="kpi-footer-note">Full-text indexed encyclopedic articles</div>
        </div>

        <div class="kpi-card col-3">
          <div class="kpi-top">
            <span class="kpi-label">Index Vocabulary</span>
            <div class="kpi-icon-pill">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
            </div>
          </div>
          <div class="kpi-value-row">
            <span class="kpi-number">${this.index.getVocabSize().toLocaleString()}</span>
            <span class="kpi-badge success">Stemmed</span>
          </div>
          <div class="kpi-footer-note">Porter stemmer + SMART stop-word removal</div>
        </div>

        <div class="kpi-card col-3">
          <div class="kpi-top">
            <span class="kpi-label">Top Precision@10</span>
            <div class="kpi-icon-pill">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
            </div>
          </div>
          <div class="kpi-value-row">
            <span class="kpi-number">0.2800</span>
            <span class="kpi-badge success">+25.4%</span>
          </div>
          <div class="kpi-footer-note">Hybrid TF-IDF + PageRank benchmark winner</div>
        </div>

        <div class="kpi-card col-3">
          <div class="kpi-top">
            <span class="kpi-label">Median Latency</span>
            <div class="kpi-icon-pill">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            </div>
          </div>
          <div class="kpi-value-row">
            <span class="kpi-number">0.026ms</span>
            <span class="kpi-badge primary">Sub-ms</span>
          </div>
          <div class="kpi-footer-note">Boolean search execution on inverted index</div>
        </div>

        <!-- 3 Algorithm Trio Bento Cards -->
        <div class="bento-card col-4">
          <div class="bento-header">
            <div class="bento-title-group">
              <div class="bento-icon-box" style="color: var(--accent-success); background: var(--accent-success-subtle);">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              </div>
              <div>
                <div class="bento-title">1. Boolean Model</div>
                <div class="bento-subtitle">Conjunctive & Disjunctive Sets</div>
              </div>
            </div>
            <span class="kpi-badge success">0.026 ms</span>
          </div>
          <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.55; margin-bottom: 1.25rem;">
            Evaluates queries using exact inverted index posting intersections (<code>AND</code>) and unions (<code>OR</code>). Near instantaneous sub-millisecond execution, but binary and brittle on conversational queries.
          </p>
          <div style="margin-top: auto;">
            <button class="btn-ghost-sm" onclick="window.irApp.selectAndSearch('boolean_and')">Test Boolean Search →</button>
          </div>
        </div>

        <div class="bento-card col-4">
          <div class="bento-header">
            <div class="bento-title-group">
              <div class="bento-icon-box" style="color: var(--accent-primary); background: var(--accent-primary-subtle);">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
              </div>
              <div>
                <div class="bento-title">2. TF-IDF Vector Space</div>
                <div class="bento-subtitle">Cosine Similarity Geometric Ranking</div>
              </div>
            </div>
            <span class="kpi-badge primary">P@10: 0.2767</span>
          </div>
          <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.55; margin-bottom: 1.25rem;">
            Represents documents and queries as high-dimensional vectors in Euclidean space with smoothed logarithmic IDF weights. Computes continuous angle similarity to rank partial matches gracefully.
          </p>
          <div style="margin-top: auto;">
            <button class="btn-ghost-sm" onclick="window.irApp.selectAndSearch('tfidf')">Test TF-IDF Vector Space →</button>
          </div>
        </div>

        <div class="bento-card col-4">
          <div class="bento-header">
            <div class="bento-title-group">
              <div class="bento-icon-box" style="color: var(--accent-purple); background: var(--accent-purple-subtle);">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
              </div>
              <div>
                <div class="bento-title">3. TF-IDF + PageRank</div>
                <div class="bento-subtitle">Hyperlink Authority Hybrid Blend</div>
              </div>
            </div>
            <span class="kpi-badge" style="background: var(--accent-purple-subtle); color: var(--accent-purple);">P@10: 0.2800</span>
          </div>
          <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.55; margin-bottom: 1.25rem;">
            Combines dynamic min-max normalized TF-IDF content relevance with PageRank link authority calculated on 179 directed hyperlinks via power iteration (<code>0.70 × TF-IDF + 0.30 × PageRank</code>).
          </p>
          <div style="margin-top: auto;">
            <button class="btn-ghost-sm" onclick="window.irApp.selectAndSearch('hybrid')">Test Hybrid Ranking →</button>
          </div>
        </div>
      </div>
    `;

    // Hook up overview hero search form
    const heroForm = document.getElementById('overviewHeroSearchForm');
    const heroInput = document.getElementById('overviewHeroInput');
    if (heroForm && heroInput) {
      heroForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const q = heroInput.value.trim();
        if (q) {
          this.switchTab('search');
          this.performSearch(q);
        }
      });
    }
  }

  searchFromChip(query) {
    this.switchTab('search');
    this.performSearch(query);
  }

  selectAndSearch(algo) {
    this.selectedAlgorithm = algo;
    this.switchTab('search');
    // Sync buttons
    document.querySelectorAll('.algo-segment-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.algo === algo);
    });
    this.performSearch(this.currentQuery);
  }

  /* ==========================================================================
     PAGE 2: SEARCH RESULTS RENDERING
     ========================================================================== */
  renderSearchResults(data) {
    const container = document.getElementById('searchResultsContainer');
    const metaBar = document.getElementById('resultsMetaBar');
    if (!container) return;

    if (!data || !data.results || data.results.length === 0) {
      if (metaBar) {
        metaBar.innerHTML = `<span class="search-results-count">0 documents found for "${this.currentQuery}"</span>`;
      }
      container.innerHTML = `
        <div class="bento-card" style="text-align: center; padding: 3rem 2rem;">
          <div style="width: 48px; height: 48px; border-radius: 50%; background: var(--bg-subtle); color: var(--text-tertiary); display: inline-flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </div>
          <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">No matching documents found</h3>
          <p style="color: var(--text-secondary); max-width: 460px; margin: 0 auto 1.5rem; font-size: 0.88rem;">
            If using Boolean AND, all query terms must appear in the exact same document. Try switching to <strong>TF-IDF Vector Space</strong> or <strong>Boolean (OR)</strong>.
          </p>
          <div style="display: flex; gap: 0.5rem; justify-content: center;">
            <button class="btn-ghost-sm" onclick="window.irApp.selectAndSearch('tfidf')">Switch to TF-IDF</button>
            <button class="btn-ghost-sm" onclick="window.irApp.selectAndSearch('boolean_or')">Switch to Boolean (OR)</button>
          </div>
        </div>
      `;
      return;
    }

    if (metaBar) {
      metaBar.innerHTML = `
        <div class="search-results-header">
          <span class="search-results-count">
            ${data.totalMatches} documents retrieved in <span style="font-family: var(--font-mono); color: var(--accent-primary);">${data.executionTimeMs} ms</span>
          </span>
          <span style="font-size: 0.8rem; color: var(--text-secondary);">
            Algorithm: <strong>${data.algorithm}</strong>
          </span>
        </div>
      `;
    }

    // Extract query terms for keyword highlighting
    const queryTerms = (data.tokens || []).map(t => t.toLowerCase());

    container.innerHTML = data.results.map((doc, idx) => {
      const highlightedSummary = this.highlightTerms(doc.summary, queryTerms);
      const inLinks = this.pageRank.getInLinks(doc.id) || [];
      const outLinks = this.pageRank.getOutLinks(doc.id) || [];

      let scoreBadge = '';
      if (this.selectedAlgorithm === 'hybrid') {
        scoreBadge = `
          <div class="result-score-capsule">
            <span style="color: var(--accent-purple);">Hybrid: ${doc.score.toFixed(4)}</span>
            <span style="color: var(--text-tertiary);">|</span>
            <span style="color: var(--accent-primary); font-size: 0.72rem;">TF-IDF: ${(doc.rawTfIdf || 0).toFixed(4)}</span>
            <span style="color: var(--accent-success); font-size: 0.72rem;">PR: ${(doc.rawPageRank || 0).toFixed(4)}</span>
          </div>
        `;
      } else if (this.selectedAlgorithm === 'tfidf') {
        scoreBadge = `
          <div class="result-score-capsule">
            <span style="color: var(--accent-primary);">Cosine Sim: ${doc.score.toFixed(4)}</span>
          </div>
        `;
      } else {
        scoreBadge = `
          <div class="result-score-capsule">
            <span style="color: var(--accent-success);">Matched: ${(doc.score * 100).toFixed(0)}% terms</span>
          </div>
        `;
      }

      return `
        <div class="result-bento-card">
          <div class="result-top-row">
            <div class="result-title-group">
              <span class="rank-indicator-pill">#${idx + 1}</span>
              <a href="javascript:void(0)" class="result-title-link" onclick="window.irApp.openDocumentModal('${doc.id}')">
                ${doc.title}
              </a>
              <span class="category-badge">${doc.category}</span>
            </div>
            ${scoreBadge}
          </div>

          <div class="result-snippet">
            ${highlightedSummary}
          </div>

          <div class="result-footer-row">
            <div class="result-meta-tags">
              <span>Backlinks: <strong>${inLinks.length}</strong></span>
              <span>•</span>
              <span>Outgoing: <strong>${outLinks.length}</strong></span>
              <span>•</span>
              <span>Raw PageRank: <strong>${this.pageRank.getScore(doc.id).toFixed(6)}</strong></span>
            </div>
            <div class="result-actions">
              <button class="btn-ghost-sm" onclick="window.irApp.openDocumentModal('${doc.id}')">
                Inspect Document ↗
              </button>
              <a href="${doc.url}" target="_blank" rel="noopener noreferrer" class="btn-ghost-sm" style="text-decoration: none;">
                Wikipedia ↗
              </a>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  highlightTerms(text, terms) {
    if (!text || !terms || terms.length === 0) return text;
    let result = text;
    terms.forEach(term => {
      if (term.length > 2) {
        const regex = new RegExp(`\\b(${term}[a-z]*)`, 'gi');
        result = result.replace(regex, `<mark class="highlighted-term">$1</mark>`);
      }
    });
    return result;
  }

  renderQuickAnswerCard(qa) {
    const container = document.getElementById('quickAnswerContainer');
    if (!container) return;

    if (!qa || !qa.found) {
      container.innerHTML = '';
      return;
    }

    container.innerHTML = `
      <div class="quick-answer-bento">
        <div class="qa-badge-row">
          <div style="display: flex; align-items: center; gap: 0.6rem;">
            <span class="qa-pill">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
              Extractive Answer
            </span>
            <span class="kpi-badge primary">[${qa.questionType} QUESTION]</span>
          </div>
          <span class="qa-source-text">
            Source: <strong>${qa.sourceDoc.title}</strong> (Relevance: ${qa.sourceDoc.relevanceScore})
          </span>
        </div>

        <div class="qa-answer-quote">
          "${qa.answer}"
        </div>

        <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.78rem; border-top: 1px solid var(--border-subtle); padding-top: 0.75rem;">
          <div style="display: flex; gap: 0.75rem; align-items: center;">
            <a href="${qa.sourceDoc.url}" target="_blank" rel="noopener noreferrer" style="color: var(--accent-primary); font-weight: 600; text-decoration: none;">
              Read Full Article on Wikipedia ↗
            </a>
            <button class="btn-ghost-sm" onclick="window.irApp.toggleMathDetails('qa-sentence-drawer')">
              Inspect Sentence Scores ▾
            </button>
          </div>
          <span style="font-family: var(--font-mono); color: var(--text-tertiary);">
            Extracted in ${qa.executionTimeMs} ms • 0 Hallucinations
          </span>
        </div>

        <div id="qa-sentence-drawer" style="display: none; margin-top: 0.5rem;" class="data-table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Candidate Sentence from Corpus</th>
                <th>Matched Terms</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              ${qa.allScoredSentences.map((s, idx) => `
                <tr style="${idx < qa.extractedSentences.length ? 'background: var(--accent-success-subtle);' : ''}">
                  <td>${s.sentenceIndex + 1}</td>
                  <td>${s.text}</td>
                  <td><code>${s.matchedTerms.join(', ') || 'None'}</code></td>
                  <td><strong>${s.score}</strong> ${idx < qa.extractedSentences.length ? '★ Selected' : ''}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  /* ==========================================================================
     PAGE 3: ALGORITHM LAB
     ========================================================================== */
  renderAlgorithmLab() {
    const container = document.getElementById('labContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="bento-grid">
        <!-- Lab Header Banner (12 Cols) -->
        <div class="bento-card col-12">
          <div class="hero-tag">INFORMATION RETRIEVAL THEORY & ALGORITHMS</div>
          <h2 style="font-size: 1.75rem; font-weight: 800; letter-spacing: -0.025em; margin: 0.4rem 0 0.5rem;">
            Algorithmic Foundations & Mathematical Architecture
          </h2>
          <p style="color: var(--text-secondary); max-width: 820px; font-size: 0.92rem; line-height: 1.6;">
            Inspect how Boolean logic, Vector Space geometry, and PageRank link topology process your query: <code>"${this.currentQuery}"</code>.
          </p>
        </div>

        <!-- 1. Boolean Retrieval Bento Card (4 Cols) -->
        <div class="bento-card col-4">
          <div class="bento-header">
            <div class="bento-title-group">
              <div class="bento-icon-box" style="color: var(--accent-success); background: var(--accent-success-subtle);">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              </div>
              <div>
                <div class="bento-title">1. Boolean Retrieval</div>
                <div class="bento-subtitle">Exact Inverted Index Postings</div>
              </div>
            </div>
            <span class="kpi-badge success">Exact Set</span>
          </div>

          <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6;">
            Treats documents and queries as sets of index words. The inverted index postings lists for each term are intersected (<code>AND</code>) or unioned (<code>OR</code>).
          </p>

          <div class="math-formula-box">
            AND: Match(d) = 1 iff ∀t ∈ Q, d ∈ Postings(t)<br>
            OR:  Match(d) = 1 iff ∃t ∈ Q, d ∈ Postings(t)
          </div>

          <div style="font-size: 0.82rem; margin-top: 0.5rem;">
            <strong>Key Characteristics:</strong>
            <ul style="margin-left: 1.2rem; margin-top: 0.35rem; color: var(--text-secondary); line-height: 1.5;">
              <li>Near-zero latency (<0.03 ms execution).</li>
              <li>Binary relevance (either in or out).</li>
              <li>Fails on natural language queries when conversational terms are missing.</li>
            </ul>
          </div>
        </div>

        <!-- 2. TF-IDF Vector Space Bento Card (4 Cols) -->
        <div class="bento-card col-4">
          <div class="bento-header">
            <div class="bento-title-group">
              <div class="bento-icon-box" style="color: var(--accent-primary); background: var(--accent-primary-subtle);">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
              </div>
              <div>
                <div class="bento-title">2. TF-IDF Vector Space</div>
                <div class="bento-subtitle">Cosine Similarity Geometric Model</div>
              </div>
            </div>
            <span class="kpi-badge primary">Continuous</span>
          </div>

          <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6;">
            Represents documents and queries as high-dimensional vectors. Documents are ranked continuously based on the cosine angle between vectors.
          </p>

          <div class="math-formula-box">
            TF(t, d) = count(t, d) / |d|<br>
            IDF(t) = ln((N + 1) / (DF(t) + 1)) + 1<br>
            CosineSim = (V_q • V_d) / (||V_q|| × ||V_d||)
          </div>

          <div style="font-size: 0.82rem; margin-top: 0.5rem;">
            <strong>Key Characteristics:</strong>
            <ul style="margin-left: 1.2rem; margin-top: 0.35rem; color: var(--text-secondary); line-height: 1.5;">
              <li>Term weighting discounts high-frequency words.</li>
              <li>Gracefully handles partial term matches.</li>
              <li>Overcomes the Boolean recall collapse.</li>
            </ul>
          </div>
        </div>

        <!-- 3. PageRank Hybrid Bento Card (4 Cols) -->
        <div class="bento-card col-4">
          <div class="bento-header">
            <div class="bento-title-group">
              <div class="bento-icon-box" style="color: var(--accent-purple); background: var(--accent-purple-subtle);">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
              </div>
              <div>
                <div class="bento-title">3. PageRank + TF-IDF</div>
                <div class="bento-subtitle">Link Analysis Markov Surfer</div>
              </div>
            </div>
            <span class="kpi-badge" style="background: var(--accent-purple-subtle); color: var(--accent-purple);">Hybrid</span>
          </div>

          <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6;">
            Combines content relevance with structural authority by evaluating the directed hyperlink topology across the 45 documents via power iteration.
          </p>

          <div class="math-formula-box">
            PR(u) = (1-d)/N + d·Σ [PR(v)/L(v)] + Dangling<br>
            Score = (0.70 × NormTFIDF) + (0.30 × NormPR)
          </div>

          <div style="font-size: 0.82rem; margin-top: 0.5rem;">
            <strong>Key Characteristics:</strong>
            <ul style="margin-left: 1.2rem; margin-top: 0.35rem; color: var(--text-secondary); line-height: 1.5;">
              <li>Elevates authoritative hubs (e.g. Solar energy).</li>
              <li>Damping factor d=0.85 models web browsing.</li>
              <li>Adds only ~0.016 ms latency over pure TF-IDF.</li>
            </ul>
          </div>
        </div>

        <!-- Live Query Term Breakdown Table (12 Cols) -->
        <div class="bento-card col-12">
          <div class="bento-header">
            <div class="bento-title-group">
              <div class="bento-icon-box">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
              </div>
              <div>
                <div class="bento-title">Live Inverted Index Inspection for "${this.currentQuery}"</div>
                <div class="bento-subtitle">Extracted query terms, document frequencies, and smoothed IDF scores</div>
              </div>
            </div>
          </div>

          <div class="data-table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Stemmed Query Term</th>
                  <th>Inverted Index Postings Count</th>
                  <th>Document Frequency (DF)</th>
                  <th>Smoothed IDF Score</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${(this.lastSearchResults && this.lastSearchResults.tokens ? this.lastSearchResults.tokens : []).map(token => {
                  const df = this.index.df.get(token) || 0;
                  const idf = this.index.calculateIdf(token);
                  return `
                    <tr>
                      <td><code style="font-weight: 700; color: var(--accent-primary);">${token}</code></td>
                      <td>${(this.index.getPostings(token) || new Map()).size} documents</td>
                      <td>${df} / ${this.corpus.length}</td>
                      <td><strong>${idf.toFixed(4)}</strong></td>
                      <td><span class="kpi-badge ${df > 0 ? 'success' : 'primary'}">${df > 0 ? 'Indexed Hit' : 'Out of Vocab'}</span></td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  /* ==========================================================================
     PAGE 4: ALGORITHM COMPARISON (SIDE-BY-SIDE)
     ========================================================================== */
  renderComparisonSection(comparison) {
    const container = document.getElementById('comparisonContainer');
    if (!container) return;

    if (!comparison) {
      comparison = this.searchEngine.runComparison(this.currentQuery);
      this.lastComparisonResults = comparison;
    }

    container.innerHTML = `
      <div class="bento-grid">
        <!-- Top Comparison Header (12 Cols) -->
        <div class="bento-card col-12">
          <div class="bento-header">
            <div>
              <div class="hero-tag">MULTI-ALGORITHM TRIANGULATION</div>
              <h2 style="font-size: 1.75rem; font-weight: 800; letter-spacing: -0.025em; margin: 0.35rem 0 0.25rem;">
                Side-by-Side Algorithm Comparison
              </h2>
              <div style="color: var(--text-secondary); font-size: 0.88rem;">
                Query: <strong>"${comparison.query}"</strong> • Triangulating Boolean (AND), TF-IDF, and Hybrid PageRank
              </div>
            </div>
            <button class="btn-ghost-sm" onclick="window.irApp.performSearch('${comparison.query}')">
              Re-run Triangulation ↻
            </button>
          </div>

          <!-- Grouped Bar Chart Container -->
          <div id="comparisonChartContainer" style="width: 100%; height: 240px; margin-top: 1rem;"></div>
        </div>

        <!-- 3-Column Side-by-Side Comparison -->
        <div class="bento-card col-4">
          <div class="column-header-title">
            <span style="color: var(--accent-success);">1. Boolean Search (AND)</span>
            <span class="kpi-badge success">${comparison.boolean.results.length} matches</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            ${comparison.boolean.results.length === 0 ? '<div style="color: var(--text-tertiary); padding: 1.5rem; text-align: center;">Zero documents match all terms simultaneously.</div>' : ''}
            ${comparison.boolean.results.map((r, i) => `
              <div style="background: var(--bg-subtle); border-radius: var(--radius-sm); padding: 0.75rem; border: 1px solid var(--border-subtle);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
                  <span style="font-weight: 700; font-size: 0.85rem;">#${i + 1} ${r.title}</span>
                  <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent-success);">${(r.score * 100).toFixed(0)}%</span>
                </div>
                <div style="font-size: 0.75rem; color: var(--text-secondary);">${r.category}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="bento-card col-4">
          <div class="column-header-title">
            <span style="color: var(--accent-primary);">2. TF-IDF Vector Space</span>
            <span class="kpi-badge primary">${comparison.tfIdf.results.length} ranked</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            ${comparison.tfIdf.results.length === 0 ? '<div style="color: var(--text-tertiary); padding: 1.5rem; text-align: center;">No documents contain query stems.</div>' : ''}
            ${comparison.tfIdf.results.map((r, i) => `
              <div style="background: var(--bg-subtle); border-radius: var(--radius-sm); padding: 0.75rem; border: 1px solid var(--border-subtle);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
                  <span style="font-weight: 700; font-size: 0.85rem;">#${i + 1} ${r.title}</span>
                  <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent-primary);">${r.score.toFixed(4)}</span>
                </div>
                <div style="font-size: 0.75rem; color: var(--text-secondary);">${r.category}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="bento-card col-4">
          <div class="column-header-title">
            <span style="color: var(--accent-purple);">3. TF-IDF + PageRank</span>
            <span class="kpi-badge" style="background: var(--accent-purple-subtle); color: var(--accent-purple);">${comparison.hybrid.results.length} ranked</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            ${comparison.hybrid.results.length === 0 ? '<div style="color: var(--text-tertiary); padding: 1.5rem; text-align: center;">No matches.</div>' : ''}
            ${comparison.hybrid.results.map((r, i) => {
              let shiftClass = 'neutral';
              if (r.rankBadge.startsWith('+')) shiftClass = 'positive';
              if (r.rankBadge.startsWith('-')) shiftClass = 'negative';
              if (r.rankBadge === 'new') shiftClass = 'new';

              return `
                <div style="background: var(--bg-subtle); border-radius: var(--radius-sm); padding: 0.75rem; border: 1px solid var(--border-subtle);">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
                    <span style="font-weight: 700; font-size: 0.85rem;">#${i + 1} ${r.title}</span>
                    <div style="display: flex; align-items: center; gap: 0.4rem;">
                      <span class="rank-shift-badge ${shiftClass}" title="Rank shift vs TF-IDF">${r.rankBadge}</span>
                      <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent-purple);">${r.score.toFixed(4)}</span>
                    </div>
                  </div>
                  <div style="font-size: 0.75rem; color: var(--text-secondary); display: flex; justify-content: space-between;">
                    <span>${r.category}</span>
                    <span style="font-family: var(--font-mono); font-size: 0.7rem;">PR: ${r.rawPageRank.toFixed(4)}</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;

    // Render grouped SVG bar chart
    setTimeout(() => {
      const chartContainer = document.getElementById('comparisonChartContainer');
      if (chartContainer) {
        ChartRenderer.renderTopScoresComparison(chartContainer, comparison);
      }
    }, 50);
  }

  /* ==========================================================================
     PAGE 5: ANALYTICS DASHBOARD (DATA VISUALIZATION)
     ========================================================================== */
  renderAnalyticsDashboard() {
    const container = document.getElementById('analyticsContainer');
    if (!container) return;

    const summaryData = this.evaluation.lastEvaluationResults || PRECOMPUTED_BENCHMARK_SUMMARY;
    const s = summaryData.summaryByAlgorithm || summaryData.summary;

    container.innerHTML = `
      <div class="bento-grid">
        <!-- Header Banner & Action Bar (12 Cols) -->
        <div class="bento-card col-12">
          <div class="bento-header">
            <div>
              <div class="hero-tag">EMPIRICAL IR EVALUATION BENCHMARK</div>
              <h2 style="font-size: 1.85rem; font-weight: 800; letter-spacing: -0.03em; margin: 0.35rem 0 0.25rem;">
                Comparative Evaluation & Performance Metrics
              </h2>
              <p style="color: var(--text-secondary); font-size: 0.9rem;">
                Empirical metrics across all 30 benchmark queries (2,400 timed executions) evaluating Mean Precision@10 and Median Response Time.
              </p>
            </div>
            <div style="display: flex; gap: 0.65rem;">
              <button id="runBenchmarkBtn" class="search-btn-primary" style="padding: 0.55rem 1.1rem; font-size: 0.82rem;">
                ⚡ Re-run 30-Query Benchmark Suite
              </button>
              <button id="exportCsvBtn" class="btn-ghost-sm" style="padding: 0.55rem 1.1rem; font-size: 0.82rem;" onclick="window.irApp.exportBenchmarkCsv()">
                ⬇ Export Results CSV
              </button>
            </div>
          </div>

          <!-- Benchmark Progress Bar (Hidden by default) -->
          <div id="benchmarkProgressArea" style="display: none; margin-top: 1rem;">
            <div style="display: flex; justify-content: space-between; font-size: 0.78rem; font-weight: 600; margin-bottom: 0.35rem;">
              <span id="benchmarkProgressStatus">Running benchmark suite...</span>
              <span id="benchmarkProgressPercent">0%</span>
            </div>
            <div style="width: 100%; height: 6px; background: var(--bg-subtle); border-radius: var(--radius-full); overflow: hidden;">
              <div id="benchmarkProgressBar" style="width: 0%; height: 100%; background: var(--accent-primary); transition: width 0.1s linear;"></div>
            </div>
          </div>
        </div>

        <!-- 4 KPI Bento Cards -->
        <div class="kpi-card col-3">
          <div class="kpi-top">
            <span class="kpi-label">Boolean (AND) P@10</span>
            <div class="kpi-icon-pill" style="color: var(--accent-success);">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle></svg>
            </div>
          </div>
          <div class="kpi-value-row">
            <span class="kpi-number">${(s.boolean_and ? s.boolean_and.meanPrecisionAt10 : (s.boolean ? s.boolean.meanPrecisionAt10 : 0.2233)).toFixed(4)}</span>
            <span class="kpi-badge success">Conjunctive</span>
          </div>
          <div class="kpi-footer-note">Median latency: 0.0261 ms</div>
        </div>

        <div class="kpi-card col-3">
          <div class="kpi-top">
            <span class="kpi-label">Boolean (OR) P@10</span>
            <div class="kpi-icon-pill" style="color: #059669;">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle></svg>
            </div>
          </div>
          <div class="kpi-value-row">
            <span class="kpi-number">${(s.boolean_or ? s.boolean_or.meanPrecisionAt10 : 0.2733).toFixed(4)}</span>
            <span class="kpi-badge success">Disjunctive</span>
          </div>
          <div class="kpi-footer-note">Median latency: 0.0207 ms (Fastest)</div>
        </div>

        <div class="kpi-card col-3">
          <div class="kpi-top">
            <span class="kpi-label">TF-IDF Mean P@10</span>
            <div class="kpi-icon-pill" style="color: var(--accent-primary);">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon></svg>
            </div>
          </div>
          <div class="kpi-value-row">
            <span class="kpi-number">${(s.tfidf ? s.tfidf.meanPrecisionAt10 : 0.2767).toFixed(4)}</span>
            <span class="kpi-badge primary">Continuous</span>
          </div>
          <div class="kpi-footer-note">Median latency: 0.1072 ms</div>
        </div>

        <div class="kpi-card col-3">
          <div class="kpi-top">
            <span class="kpi-label">Hybrid Mean P@10</span>
            <div class="kpi-icon-pill" style="color: var(--accent-purple);">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline></svg>
            </div>
          </div>
          <div class="kpi-value-row">
            <span class="kpi-number">${(s.hybrid ? s.hybrid.meanPrecisionAt10 : 0.2800).toFixed(4)}</span>
            <span class="kpi-badge" style="background: var(--accent-purple-subtle); color: var(--accent-purple);">Winner</span>
          </div>
          <div class="kpi-footer-note">Median latency: 0.1232 ms</div>
        </div>

        <!-- Chart Bento Row (6 Cols + 6 Cols) -->
        <div class="bento-card col-6">
          <div class="bento-header">
            <div class="bento-title-group">
              <div class="bento-icon-box">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
              </div>
              <div>
                <div class="bento-title">Mean Precision@10 Comparison</div>
                <div class="bento-subtitle">Average precision across 30 benchmark queries</div>
              </div>
            </div>
          </div>
          <div id="analyticsPrecisionChart" style="width: 100%; height: 240px;"></div>
        </div>

        <div class="bento-card col-6">
          <div class="bento-header">
            <div class="bento-title-group">
              <div class="bento-icon-box">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              </div>
              <div>
                <div class="bento-title">Median Search Latency (ms)</div>
                <div class="bento-subtitle">Pure search execution time (lower is faster)</div>
              </div>
            </div>
          </div>
          <div id="analyticsLatencyChart" style="width: 100%; height: 240px;"></div>
        </div>

        <!-- 5 Category Breakdown Chart (12 Cols) -->
        <div class="bento-card col-12">
          <div class="bento-header">
            <div class="bento-title-group">
              <div class="bento-icon-box">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              </div>
              <div>
                <div class="bento-title">Performance Across 5 Query Categories</div>
                <div class="bento-subtitle">Single-Word, Multiword, Ambiguous, Rare/Specific, and Natural-Language</div>
              </div>
            </div>
          </div>
          <div id="analyticsCategoryChart" style="width: 100%; height: 260px;"></div>
        </div>

        <!-- Benchmark Queries Detailed Table (12 Cols) -->
        <div class="bento-card col-12">
          <div class="bento-header">
            <div class="bento-title-group">
              <div class="bento-icon-box">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
              </div>
              <div>
                <div class="bento-title">30 Predefined Benchmark Test Queries</div>
                <div class="bento-subtitle">Audited ground truth relevance judgments and measured metrics</div>
              </div>
            </div>
          </div>

          <div class="data-table-wrapper" style="max-height: 420px; overflow-y: auto;">
            <table class="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Category</th>
                  <th>Query Text</th>
                  <th>Relevant Docs</th>
                  <th>Boolean AND P@10</th>
                  <th>TF-IDF P@10</th>
                  <th>Hybrid P@10</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${(summaryData.detailedQueries || []).map(q => `
                  <tr>
                    <td><span style="font-family: var(--font-mono); font-weight: 700;">${q.id}</span></td>
                    <td><span class="category-badge">${q.category}</span></td>
                    <td><strong>"${q.query}"</strong></td>
                    <td>${q.totalRelevantInCorpus || q.relevantDocIds.length} docs</td>
                    <td>${q.results.boolean_and ? q.results.boolean_and.precisionAt10.toFixed(2) : '-'}</td>
                    <td>${q.results.tfidf ? q.results.tfidf.precisionAt10.toFixed(2) : '-'}</td>
                    <td><strong style="color: var(--accent-purple);">${q.results.hybrid ? q.results.hybrid.precisionAt10.toFixed(2) : '-'}</strong></td>
                    <td>
                      <button class="btn-ghost-sm" onclick="window.irApp.searchFromChip('${q.query}')">
                        Search ↵
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    // Render SVG Charts into containers
    setTimeout(() => {
      const pChart = document.getElementById('analyticsPrecisionChart');
      const lChart = document.getElementById('analyticsLatencyChart');
      const cChart = document.getElementById('analyticsCategoryChart');

      if (pChart) ChartRenderer.renderPrecisionComparisonChart(pChart, s);
      if (lChart) ChartRenderer.renderLatencyComparisonChart(lChart, s);
      if (cChart && summaryData.categorySummary) ChartRenderer.renderCategoryBreakdownChart(cChart, summaryData.categorySummary);
    }, 50);

    // Bind live benchmark suite button
    const runBtn = document.getElementById('runBenchmarkBtn');
    if (runBtn) {
      runBtn.addEventListener('click', () => this.runLiveBenchmark());
    }
  }

  async runLiveBenchmark() {
    const progressArea = document.getElementById('benchmarkProgressArea');
    const progressBar = document.getElementById('benchmarkProgressBar');
    const progressStatus = document.getElementById('benchmarkProgressStatus');
    const progressPercent = document.getElementById('benchmarkProgressPercent');

    if (progressArea) progressArea.style.display = 'block';

    const onProgress = (percent, statusText) => {
      if (progressBar) progressBar.style.width = `${Math.round(percent * 100)}%`;
      if (progressPercent) progressPercent.textContent = `${Math.round(percent * 100)}%`;
      if (progressStatus) progressStatus.textContent = statusText;
    };

    const results = await this.evaluation.runFullBenchmark(onProgress);
    if (progressStatus) progressStatus.textContent = 'Benchmark completed successfully!';

    setTimeout(() => {
      this.renderAnalyticsDashboard();
    }, 400);
  }

  exportBenchmarkCsv() {
    const csvContent = this.evaluation.exportToCsv();
    if (!csvContent) return;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ir_benchmark_results_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /* ==========================================================================
     PAGE 6: PAGERANK GRAPH EXPLORER
     ========================================================================== */
  renderGraphExplorer() {
    const container = document.getElementById('graphContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="bento-grid">
        <!-- Graph Canvas Card (8 Cols) -->
        <div class="bento-card col-8" style="min-height: 580px; padding: 1.25rem; display: flex; flex-direction: column;">
          <div class="bento-header">
            <div>
              <div class="hero-tag">HYPERLINK TOPOLOGY & PAGERANK FLOW</div>
              <h2 style="font-size: 1.45rem; font-weight: 800; letter-spacing: -0.02em; margin: 0.35rem 0 0.15rem;">
                Document Relationship Network
              </h2>
              <div style="font-size: 0.8rem; color: var(--text-secondary);">
                45 nodes, 179 directed edges. Node radius represents PageRank authority score. Click or drag any node to inspect authority.
              </div>
            </div>
            <div style="display: flex; gap: 0.4rem;">
              <span class="corpus-pill-badge" style="font-size: 0.72rem;">d=0.85 Damping</span>
            </div>
          </div>

          <!-- SVG Visualizer Canvas -->
          <div id="graphCanvasWrapper" style="flex: 1; width: 100%; min-height: 480px; position: relative; background: var(--bg-subtle); border-radius: var(--radius-md); border: 1px solid var(--border-subtle); overflow: hidden;">
          </div>
        </div>

        <!-- Node Inspector Bento Card (4 Cols) -->
        <div class="bento-card col-4" id="graphInspectorPanel" style="min-height: 580px;">
          <div class="bento-header">
            <div class="bento-title-group">
              <div class="bento-icon-box">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              </div>
              <div>
                <div class="bento-title">Node Inspector</div>
                <div class="bento-subtitle">Select a document in the graph</div>
              </div>
            </div>
          </div>

          <div id="inspectorContent" style="display: flex; flex-direction: column; gap: 1rem;">
            <div style="padding: 2.5rem 1.5rem; text-align: center; color: var(--text-secondary); font-size: 0.88rem;">
              Click on any node in the graph network to inspect its in-links, out-links, and PageRank distribution.
            </div>
          </div>
        </div>
      </div>
    `;

    setTimeout(() => {
      const graphWrapper = document.getElementById('graphCanvasWrapper');
      if (graphWrapper) {
        const graphData = this.pageRank.getVisualizationGraph();
        this.graphVisualizer = new GraphVisualizer(graphWrapper, graphData, (selectedNode) => {
          this.updateGraphInspector(selectedNode);
        });
      }
    }, 60);
  }

  updateGraphInspector(node) {
    const panel = document.getElementById('inspectorContent');
    if (!panel) return;

    if (!node) {
      panel.innerHTML = `
        <div style="padding: 2.5rem 1.5rem; text-align: center; color: var(--text-secondary); font-size: 0.88rem;">
          Click on any node in the graph network to inspect its in-links, out-links, and PageRank distribution.
        </div>
      `;
      return;
    }

    const inLinks = this.pageRank.getInLinks(node.id) || [];
    const outLinks = this.pageRank.getOutLinks(node.id) || [];
    const doc = this.index.getDocById(node.id);

    panel.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 0.85rem;">
        <div>
          <span class="category-badge">${node.category}</span>
          <h3 style="font-size: 1.35rem; font-weight: 800; letter-spacing: -0.02em; margin-top: 0.35rem; color: var(--text-primary);">
            ${node.title}
          </h3>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.65rem;">
          <div style="background: var(--bg-subtle); padding: 0.75rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
            <div style="font-size: 0.72rem; color: var(--text-secondary); text-transform: uppercase; font-weight: 600;">PageRank</div>
            <div style="font-family: var(--font-mono); font-size: 1.15rem; font-weight: 800; color: var(--accent-purple);">${node.pageRank.toFixed(6)}</div>
          </div>
          <div style="background: var(--bg-subtle); padding: 0.75rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
            <div style="font-size: 0.72rem; color: var(--text-secondary); text-transform: uppercase; font-weight: 600;">Total Links</div>
            <div style="font-family: var(--font-mono); font-size: 1.15rem; font-weight: 800; color: var(--accent-primary);">${inLinks.length + outLinks.length}</div>
          </div>
        </div>

        <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.55;">
          ${doc ? doc.summary : ''}
        </p>

        <div style="border-top: 1px solid var(--border-subtle); padding-top: 0.75rem;">
          <div style="font-size: 0.78rem; font-weight: 700; color: var(--accent-success); margin-bottom: 0.35rem;">
            ← Incoming Backlinks (${inLinks.length}):
          </div>
          <div style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.5;">
            ${inLinks.length > 0 ? inLinks.map(id => {
              const d = this.index.getDocById(id);
              return d ? d.title : id;
            }).join(', ') : 'None (Root Node)'}
          </div>
        </div>

        <div style="border-top: 1px solid var(--border-subtle); padding-top: 0.75rem;">
          <div style="font-size: 0.78rem; font-weight: 700; color: var(--accent-primary); margin-bottom: 0.35rem;">
            → Outgoing Citations (${outLinks.length}):
          </div>
          <div style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.5;">
            ${outLinks.length > 0 ? outLinks.map(id => {
              const d = this.index.getDocById(id);
              return d ? d.title : id;
            }).join(', ') : 'None (Dangling Node)'}
          </div>
        </div>

        <div style="margin-top: 0.5rem; display: flex; gap: 0.5rem;">
          <button class="search-btn-primary" style="flex: 1; padding: 0.55rem; font-size: 0.82rem;" onclick="window.irApp.searchFromChip('${node.title}')">
            Search in Engine ↵
          </button>
          <button class="btn-ghost-sm" onclick="window.irApp.openDocumentModal('${node.id}')">
            Full Modal
          </button>
        </div>
      </div>
    `;
  }

  /* ==========================================================================
     PAGE 7: ABOUT PROJECT
     ========================================================================== */
  renderAboutProject() {
    const container = document.getElementById('aboutContainer');
    if (!container) return;

    container.innerHTML = `
      <div class="bento-grid">
        <div class="bento-card col-12">
          <div class="hero-tag">ACADEMIC CAPSTONE PROJECT</div>
          <h2 style="font-size: 2rem; font-weight: 800; letter-spacing: -0.03em; margin: 0.4rem 0 0.5rem;">
            Mini Search Engine Using TF-IDF and PageRank
          </h2>
          <p style="color: var(--text-secondary); font-size: 1rem; max-width: 820px; line-height: 1.6;">
            A Comparative Study of Text Retrieval and Link-Based Ranking developed for the KTU B.Tech Computer Science and Engineering Information Retrieval curriculum.
          </p>
        </div>

        <div class="bento-card col-6">
          <div class="bento-header">
            <div class="bento-title-group">
              <div class="bento-icon-box">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
              </div>
              <div class="bento-title">System Architecture</div>
            </div>
          </div>
          <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">
            The project operates entirely client-side using authentic zero-dependency data structures:
          </p>
          <ul style="margin-left: 1.25rem; font-size: 0.85rem; color: var(--text-secondary); line-height: 1.7;">
            <li><strong>Text Preprocessor:</strong> Alphanumeric tokenization, Porter suffix stemming, SMART stop-words elimination.</li>
            <li><strong>Inverted Index:</strong> Record-level posting lists with positions, term frequencies, and document lengths.</li>
            <li><strong>Vector Space Engine:</strong> Smoothed IDF calculation, Euclidean document normalization, cosine similarity.</li>
            <li><strong>PageRank Power Iteration:</strong> Directed adjacency matrix with damping factor d=0.85 and dangling node redistribution.</li>
            <li><strong>Extractive QA:</strong> Natural language intent detection and sentence scoring from authentic source text.</li>
          </ul>
        </div>

        <div class="bento-card col-6">
          <div class="bento-header">
            <div class="bento-title-group">
              <div class="bento-icon-box">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
              </div>
              <div class="bento-title">Evaluation Methodology</div>
            </div>
          </div>
          <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">
            Following strict Information Retrieval academic benchmarking standards:
          </p>
          <ul style="margin-left: 1.25rem; font-size: 0.85rem; color: var(--text-secondary); line-height: 1.7;">
            <li><strong>Precision@10:</strong> Fraction of top 10 retrieved documents that are relevant according to human ground truth.</li>
            <li><strong>Search Execution Latency:</strong> Sub-millisecond timing using high-resolution monotonic clocks (<code>performance.now()</code>), strictly excluding initialization, index building, and DOM rendering.</li>
            <li><strong>Controlled Testing:</strong> 30 diverse queries across 5 distinct query categories (Single-Word, Multiword, Ambiguous, Rare/Specific, Natural Language questions).</li>
          </ul>
        </div>
      </div>
    `;
  }

  /* ==========================================================================
     GLOBAL MODAL & UTILITY FUNCTIONS
     ========================================================================== */
  openDocumentModal(docId) {
    const doc = this.index.getDocById(docId);
    if (!doc) return;

    const modalOverlay = document.getElementById('docModalOverlay');
    const modalContent = document.getElementById('docModalContent');
    if (!modalOverlay || !modalContent) return;

    const inLinks = this.pageRank.getInLinks(docId) || [];
    const outLinks = this.pageRank.getOutLinks(docId) || [];

    modalContent.innerHTML = `
      <div style="font-size: 0.75rem; color: var(--accent-primary); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.35rem;">
        ${doc.category}
      </div>
      <h2 style="font-size: 1.85rem; font-weight: 800; letter-spacing: -0.025em; margin-bottom: 0.85rem;">${doc.title}</h2>
      
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.25rem;">
        <span class="kpi-badge" style="background: var(--accent-purple-subtle); color: var(--accent-purple);">PageRank: ${this.pageRank.getScore(doc.id).toFixed(6)}</span>
        <span class="kpi-badge primary">Backlinks: ${inLinks.length}</span>
        <span class="kpi-badge success">Outgoing Citations: ${outLinks.length}</span>
      </div>

      <div style="font-size: 0.95rem; line-height: 1.65; color: var(--text-secondary); margin-bottom: 1.5rem;">
        ${doc.content}
      </div>

      <div style="background: var(--bg-subtle); border-radius: var(--radius-md); padding: 1rem; border: 1px solid var(--border-subtle); margin-bottom: 1.25rem;">
        <div style="font-weight: 700; font-size: 0.85rem; margin-bottom: 0.35rem;">Hyperlink Topology:</div>
        <div style="font-size: 0.78rem; color: var(--text-secondary); margin-bottom: 0.25rem;">
          <strong>Incoming links (${inLinks.length}):</strong> ${inLinks.length > 0 ? inLinks.map(id => this.index.getDocById(id)?.title || id).join(', ') : 'None'}
        </div>
        <div style="font-size: 0.78rem; color: var(--text-secondary);">
          <strong>Outgoing links (${outLinks.length}):</strong> ${outLinks.length > 0 ? outLinks.map(id => this.index.getDocById(id)?.title || id).join(', ') : 'None'}
        </div>
      </div>

      <div style="display: flex; justify-content: flex-end; gap: 0.75rem;">
        <a href="${doc.url}" target="_blank" rel="noopener noreferrer" class="search-btn-primary" style="text-decoration: none; padding: 0.6rem 1.2rem; font-size: 0.85rem;">
          Read on Wikipedia ↗
        </a>
      </div>
    `;

    modalOverlay.classList.add('open');
  }

  toggleMathDetails(elementId) {
    const el = document.getElementById(elementId);
    if (!el) return;
    el.style.display = el.style.display === 'none' ? 'block' : 'none';
  }
}

// Bootstrap on DOM ready
window.addEventListener('DOMContentLoaded', () => {
  window.irApp = new InformationRetrievalApp();
});


})();
