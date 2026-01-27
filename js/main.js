'use strict';

// ==================================
// ギャラリー機能
// ==================================

const GALLERY_DISPLAY_COUNT = 6;

/**
 * ギャラリーデータを読み込み、ランダムに6枚を表示
 */
async function loadGallery() {
  const galleryGrid = document.getElementById('gallery-grid');
  if (!galleryGrid) return;

  try {
    const response = await fetch('data/gallery.json');
    if (!response.ok) {
      throw new Error('ギャラリーデータの読み込みに失敗しました');
    }

    const data = await response.json();
    const items = data.items || [];

    if (items.length === 0) {
      galleryGrid.innerHTML = '<p>作品を準備中です</p>';
      return;
    }

    // ランダムに6枚選択
    const selectedItems = shuffleArray(items).slice(0, GALLERY_DISPLAY_COUNT);

    // カードを生成
    selectedItems.forEach((item, index) => {
      const card = createGalleryCard(item, index);
      galleryGrid.appendChild(card);
    });

    // ギャラリーカードにスクロールアニメーションを適用
    initScrollReveal();
  } catch (error) {
    galleryGrid.innerHTML = '<p>ギャラリーを読み込めませんでした</p>';
    initScrollReveal();
  }
}

/**
 * 配列をシャッフル（Fisher-Yates）
 */
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * ギャラリーカードを生成
 */
function createGalleryCard(item, index) {
  const card = document.createElement('div');
  card.className = 'gallery-card reveal';
  card.style.setProperty('--card-index', index);

  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front">
        <img src="${escapeHtml(item.imagePath)}" alt="${escapeHtml(item.title)}">
      </div>
      <div class="card-back">
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.description)}</p>
      </div>
    </div>
  `;

  // クリックで裏返し
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });

  return card;
}

/**
 * HTMLエスケープ
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ==================================
// お問い合わせフォーム
// ==================================

/**
 * フォーム送信処理を初期化
 */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form || !status) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitButton = form.querySelector('.submit-button');
    const originalText = submitButton.textContent;

    // 送信中の状態
    submitButton.disabled = true;
    submitButton.textContent = '送信中...';
    status.className = 'form-status';
    status.style.display = 'none';

    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        status.textContent = 'お問い合わせを送信しました。ありがとうございます。 / Thank you for your message.';
        status.className = 'form-status success';
        status.style.display = '';
        form.reset();
      } else {
        throw new Error('送信に失敗しました');
      }
    } catch (error) {
      status.textContent = '送信に失敗しました。時間をおいて再度お試しください。 / Failed to send. Please try again later.';
      status.className = 'form-status error';
      status.style.display = '';
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  });
}

// ==================================
// スクロールフェードイン
// ==================================

/**
 * スクロールで要素がふわっと表示される
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach((el) => {
    observer.observe(el);
  });
}

// ==================================
// ギャラリーリフレッシュ
// ==================================

let galleryData = null;

/**
 * ギャラリーをリフレッシュ
 */
async function refreshGallery() {
  const galleryGrid = document.getElementById('gallery-grid');
  if (!galleryGrid) return;

  // データがなければ取得
  if (!galleryData) {
    try {
      const response = await fetch('data/gallery.json');
      if (!response.ok) return;
      galleryData = await response.json();
    } catch (error) {
      return;
    }
  }

  const items = galleryData.items || [];
  if (items.length === 0) return;

  // グリッドをクリア
  galleryGrid.innerHTML = '';

  // ランダムに6枚選択
  const selectedItems = shuffleArray(items).slice(0, GALLERY_DISPLAY_COUNT);

  // カードを生成（すでに表示されているのでrevealedクラスも追加）
  selectedItems.forEach((item, index) => {
    const card = createGalleryCard(item, index);
    card.classList.add('revealed');
    galleryGrid.appendChild(card);
  });
}

/**
 * リフレッシュボタンを初期化
 */
function initRefreshButton() {
  const refreshButton = document.getElementById('refresh-gallery');
  if (!refreshButton) return;

  refreshButton.addEventListener('click', () => {
    refreshGallery();
  });
}

// ==================================
// お知らせカルーセル
// ==================================

let newsCurrentIndex = 0;
let newsItems = [];

/**
 * お知らせデータを読み込み、カルーセルを初期化
 */
async function loadNews() {
  const newsTrack = document.getElementById('news-track');
  const indicators = document.getElementById('carousel-indicators');
  if (!newsTrack || !indicators) return;

  try {
    const response = await fetch('data/news.json');
    if (!response.ok) {
      throw new Error('お知らせデータの読み込みに失敗しました');
    }

    const data = await response.json();
    newsItems = data.items || [];

    if (newsItems.length === 0) {
      newsTrack.innerHTML = '<p class="news-empty">お知らせはありません</p>';
      return;
    }

    // カードを生成
    newsItems.forEach((item) => {
      const card = createNewsCard(item);
      newsTrack.appendChild(card);
    });

    // インジケーターを生成
    newsItems.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = 'carousel-indicator' + (index === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `お知らせ ${index + 1}`);
      dot.addEventListener('click', () => goToSlide(index));
      indicators.appendChild(dot);
    });

    // ボタンの状態を更新
    updateCarouselButtons();

  } catch (error) {
    newsTrack.innerHTML = '<p class="news-empty">お知らせを読み込めませんでした</p>';
  }
}

/**
 * お知らせカードを生成
 */
function createNewsCard(item) {
  const card = document.createElement('div');
  card.className = 'news-card';

  const dateFormatted = formatDate(item.date);
  const imageHtml = item.image
    ? `<img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}">`
    : '';

  card.innerHTML = `
    <div class="news-card-inner">
      <div class="news-image">${imageHtml}</div>
      <div class="news-content">
        <p class="news-date">${escapeHtml(dateFormatted)}</p>
        <h3 class="news-title">${escapeHtml(item.title)}</h3>
        <p class="news-text">${escapeHtml(item.content)}</p>
      </div>
    </div>
  `;

  return card;
}

/**
 * 日付をフォーマット（YYYY-MM-DD → YYYY.MM.DD）
 */
function formatDate(dateStr) {
  return dateStr.replace(/-/g, '.');
}

/**
 * 指定スライドに移動
 */
function goToSlide(index) {
  if (index < 0 || index >= newsItems.length) return;

  newsCurrentIndex = index;
  const newsTrack = document.getElementById('news-track');
  if (newsTrack) {
    newsTrack.style.transform = `translateX(-${index * 100}%)`;
  }

  updateCarouselIndicators();
  updateCarouselButtons();
}

/**
 * インジケーターを更新
 */
function updateCarouselIndicators() {
  const indicators = document.querySelectorAll('.carousel-indicator');
  indicators.forEach((dot, index) => {
    dot.classList.toggle('active', index === newsCurrentIndex);
  });
}

/**
 * ボタンの有効/無効を更新
 */
function updateCarouselButtons() {
  const prevButton = document.querySelector('.carousel-prev');
  const nextButton = document.querySelector('.carousel-next');

  if (prevButton) {
    prevButton.disabled = newsCurrentIndex === 0;
  }
  if (nextButton) {
    nextButton.disabled = newsCurrentIndex >= newsItems.length - 1;
  }
}

/**
 * カルーセルボタンを初期化
 */
function initCarouselButtons() {
  const prevButton = document.querySelector('.carousel-prev');
  const nextButton = document.querySelector('.carousel-next');

  if (prevButton) {
    prevButton.addEventListener('click', () => {
      goToSlide(newsCurrentIndex - 1);
    });
  }

  if (nextButton) {
    nextButton.addEventListener('click', () => {
      goToSlide(newsCurrentIndex + 1);
    });
  }
}

// ==================================
// 初期化
// ==================================

document.addEventListener('DOMContentLoaded', () => {
  loadGallery();
  loadNews();
  initCarouselButtons();
  initContactForm();
  initRefreshButton();
});
