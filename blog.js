fetch('articles.json')
  .then(res => res.json())
  .then(articles => {
    const container = document.getElementById('blog-container');

    // Sort articles from most recent to oldest
    articles.sort((a, b) => new Date(b.date) - new Date(a.date));

    articles.forEach(article => {
      const articleCard = document.createElement('div');
      articleCard.className = 'blog-article';

      articleCard.innerHTML = `
        <h2 class="article-title">
          <a href="articles/${article.file}">${article.title}</a>
        </h2>
        <p class="article-meta">
          <i class="fas fa-calendar"></i> ${new Date(article.date).toLocaleDateString()} &nbsp; | &nbsp;
          <i class="fas fa-user"></i> ${article.author}
        </p>
        <p class="article-preview">
          ${article.content.slice(0, 200)}...
          <a href="articles/${article.file}" class="read-more-link">Read More</a>
        </p>
      `;

      container.appendChild(articleCard);
    });
  })
  .catch(error => console.error('Error loading articles:', error));
