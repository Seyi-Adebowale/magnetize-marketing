const container = document.getElementById('article-container');
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

fetch('articles.json')
  .then(res => res.json())
  .then(articles => {
    const article = articles.find(a => a.id == id);

    if (!article) {
      container.innerHTML = `<h2>Article not found</h2>`;
      return;
    }

    container.innerHTML = `
      <h1 class="article-title">${article.title}</h1>
      <p class="article-meta"><i class="fas fa-calendar"></i> ${article.date} &nbsp; | &nbsp; <i class="fas fa-user"></i> ${article.author}</p>
      <div class="article-full">${article.content}</div>
      <a href="blog.html" class="back-link">← Back to Blog</a>
    `;
  });
