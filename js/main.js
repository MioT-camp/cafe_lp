document.addEventListener('DOMContentLoaded', () => {
  // ハンバーガーメニューの制御
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  // スクロールトップボタンの制御
  const scrollTopButton = document.getElementById('scroll-top');

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollTopButton.classList.add('show');
    } else {
      scrollTopButton.classList.remove('show');
    }
  });

  scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // スクロールアニメーション
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // アニメーション対象の要素を監視
  const animateElements = document.querySelectorAll('.feature-card, .menu-card, .special-container');
  animateElements.forEach(element => {
    observer.observe(element);
  });

  // スムーズスクロール
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // モバイルメニューが開いている場合は閉じる
        if (navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          hamburger.classList.remove('active');
        }
      }
    });
  });

  // フォームのバリデーションとアニメーション
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // ここにフォーム送信の処理を追加
      alert('お問い合わせありがとうございます。\nメッセージを受け付けました。');
      contactForm.reset();
    });
  }
});
