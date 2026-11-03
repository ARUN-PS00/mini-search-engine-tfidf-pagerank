// Curated Simple English Wikipedia Knowledge Corpus for Information Retrieval Demonstrations
// Each document contains authentic encyclopedic content, canonical Wikipedia URLs, and authentic directed hyperlinks.

export const WIKIPEDIA_CORPUS = [
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
export const BENCHMARK_QUERIES = [
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
export const STOP_WORDS = new Set([
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
