
document.addEventListener('DOMContentLoaded', () => {
  // 1. Data Store for Interactive Curriculum & Concentration Explorer ("The One Live Thing")
  const trackData = {
    se: {
      title: 'Rekayasa Perangkat Lunak & Komputasi Awan',
      desc: 'Fokus mendalam pada arsitektur perangkat lunak modern, pengembangan platform web skala besar, arsitektur microservices, dan implementasi CI/CD cloud native.',
      sks: '48 SKS',
      lab: 'Lab Software',
      labDetail: 'Dilengkapi workstation modern dengan lingkungan kontainer Docker, Gitlab Runner internal, dan akses server cloud komputasi.',
      careers: 'Full-Stack Software Engineer, Cloud Architect, Mobile App Specialist, DevOps Engineer.',
      courses: [
        { name: 'Arsitektur Perangkat Lunak & Pola Desain', sks: '3 SKS · Teori & Praktik' },
        { name: 'Rekayasa Aplikasi Web Skala Industri', sks: '4 SKS · Studio Coding' },
        { name: 'Sistem Terdistribusi & Cloud Native', sks: '3 SKS · Hands-on Cluster' },
        { name: 'Penjaminan Mutu & Pengujian Otomatis', sks: '3 SKS · CI/CD Testbed' }
      ]
    },
    ai: {
      title: 'Kecerdasan Buatan & Sains Data Terapan',
      desc: 'Mempersiapkan mahasiswa menguasai algoritma machine learning, pemrosesan bahasa alami (NLP), analisis big data, dan computer vision untuk kebutuhan industri.',
      sks: '48 SKS',
      lab: 'Lab AI & Data',
      labDetail: 'Didukung server komputasi berakselerasi GPU untuk pelatihan model machine learning dan eksplorasi dataset skala masif.',
      careers: 'Machine Learning Engineer, Data Scientist, AI Prompt & Solutions Architect, Data Analyst.',
      courses: [
        { name: 'Algoritma Pembelajaran Mesin (Machine Learning)', sks: '4 SKS · Hands-on Lab' },
        { name: 'Pemrosesan Bahasa Alami & Model Bahasa Besar', sks: '3 SKS · Riset AI' },
        { name: 'Pengolahan Citra Digital & Computer Vision', sks: '3 SKS · Studio Praktik' },
        { name: 'Rekayasa Data Skala Besar (Big Data Engineering)', sks: '3 SKS · Data Pipeline' }
      ]
    },
    sec: {
      title: 'Keamanan Siber & Infrastruktur Jaringan',
      desc: 'Mencakup pertahanan jaringan defensif, analisis kerentanan sistem, kriptografi modern, keamanan cloud, dan penanganan insiden siber sesuai standar industri.',
      sks: '48 SKS',
      lab: 'Lab Cyber Defense',
      labDetail: 'Laboratorium terisolasi dengan perangkat keras router/switch fisik untuk simulasi penetration testing dan hardening sistem.',
      careers: 'Cybersecurity Analyst, Penetration Tester / Ethical Hacker, Network Defense Engineer, Information Security Officer.',
      courses: [
        { name: 'Keamanan Jaringan Komputer & Kriptografi', sks: '4 SKS · Simulasi Lab' },
        { name: 'Pengujian Penetrasi & Audit Keamanan Sistem', sks: '3 SKS · Ethical Hacking' },
        { name: 'Forensik Digital & Investigasi Insiden Siber', sks: '3 SKS · Studi Kasus' },
        { name: 'Tata Kelola Keamanan Informasi & Kepatuhan ISO', sks: '3 SKS · Kerangka Regulasi' }
      ]
    }
  };

  // 2. Concentration Explorer Tabs Controller
  const tabButtons = document.querySelectorAll('.track-tab-btn');
  const trackTitle = document.getElementById('trackTitle');
  const trackDesc = document.getElementById('trackDesc');
  const trackSks = document.getElementById('trackSks');
  const trackLab = document.getElementById('trackLab');
  const trackLabDetail = document.getElementById('trackLabDetail');
  const trackCareers = document.getElementById('trackCareers');
  const trackCourses = document.getElementById('trackCourses');

  function updateTrack(trackKey) {
    const data = trackData[trackKey];
    if (!data) return;

    // Update active tab states
    tabButtons.forEach(btn => {
      const isActive = btn.getAttribute('data-track') === trackKey;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    // Animate content refresh
    if (trackTitle) trackTitle.textContent = data.title;
    if (trackDesc) trackDesc.textContent = data.desc;
    if (trackSks) trackSks.textContent = data.sks;
    if (trackLab) trackLab.textContent = data.lab;
    if (trackLabDetail) trackLabDetail.textContent = data.labDetail;
    if (trackCareers) {
      trackCareers.innerHTML = `<strong>Prospek Karier:</strong> ${data.careers}`;
    }

    // Render courses list
    if (trackCourses) {
      trackCourses.innerHTML = data.courses.map(course => `
        <li class="track-course-item">
          <span class="track-course-name">${course.name}</span>
          <span class="track-course-sks">${course.sks}</span>
        </li>
      `).join('');
    }
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const trackKey = btn.getAttribute('data-track');
      updateTrack(trackKey);
    });
  });

  // 3. Motion Layer: Signature Shutter Image & Staggered Scroll Reveals
  const shutterEl = document.querySelector('.shutter');
  if (shutterEl) {
    // Trigger hero shutter opening quickly after initial render
    requestAnimationFrame(() => {
      setTimeout(() => {
        shutterEl.classList.add('is-in');
      }, 100);
    });
  }

  // IntersectionObserver for elements with [data-reveal]
  const revealElements = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback if IntersectionObserver not available
    revealElements.forEach(el => el.classList.add('is-in'));
  }

  // 4. Contact Form Submission & Feedback Handling
  const contactForm = document.getElementById('contactForm');
  const formAlert = document.getElementById('formAlert');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nama = document.getElementById('nama')?.value.trim() || '';
      const email = document.getElementById('email')?.value.trim() || '';
      const pesan = document.getElementById('pesan')?.value.trim() || '';

      if (!nama || !email || !pesan) {
        alert('Mohon lengkapi semua kolom formulir.');
        return;
      }

      // Display clean inline confirmation message
      if (formAlert) {
        formAlert.style.display = 'block';
        formAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      contactForm.reset();
    });
  }

  // 5. Active Nav Highlighting on Scroll
  const navLinks = document.querySelectorAll('.site-nav .nav-link[href^="#"]');
  const sections = Array.from(navLinks).map(link => {
    const target = document.querySelector(link.getAttribute('href'));
    return { link, target };
  }).filter(item => item.target !== null);

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 120;
    sections.forEach(({ link, target }) => {
      const top = target.offsetTop;
      const height = target.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { passive: true });
});
