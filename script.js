(function () {
  /* ── THEME TOGGLE ── */
  const root = document.documentElement;
  const themeBtn = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('theme-icon');
  const savedTheme = localStorage.getItem('tuTheme') || 'dark';

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('tuTheme', theme);
    themeIcon.className = theme === 'dark' ? 'bx bx-moon' : 'bx bx-sun';
    themeBtn.title = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
  }
  applyTheme(savedTheme);

  themeBtn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  /* ── MOBILE MENU TOGGLE ── */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const headerNav = document.querySelector('.header-nav');

  if (mobileMenuBtn && headerNav) {
    mobileMenuBtn.addEventListener('click', () => {
      // Toggle dropdown open/close
      headerNav.classList.toggle('active');
      
      // Change icon from Menu to X
      const icon = mobileMenuBtn.querySelector('i');
      if (headerNav.classList.contains('active')) {
        icon.classList.remove('bx-menu');
        icon.classList.add('bx-x');
      } else {
        icon.classList.remove('bx-x');
        icon.classList.add('bx-menu');
      }
    });

    // Close menu smoothly if user clicks a link
    const navLinks = headerNav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        headerNav.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('bx-x');
        icon.classList.add('bx-menu');
      });
    });
  }

  /* ── SCROLL REVEAL ── */
  if (typeof ScrollReveal !== 'undefined') {
    ScrollReveal().reveal('.hero-content', { origin: 'left', distance: '60px' });
    ScrollReveal().reveal('.hero-graphic', { origin: 'right', distance: '60px', delay: 200 });
    ScrollReveal().reveal('.step-card', { interval: 150 });
    ScrollReveal().reveal('.form-panel', { origin: 'left', distance: '50px' });
    ScrollReveal().reveal('.preview-panel', { origin: 'right', distance: '50px', delay: 150 });
  }

  /* ── FIELD BINDINGS ── */
  const fields = [
    'universityName', 'collegeName', 'collegeAddress', 'faculty', 'department',
    'specificDepartment', 'semester', 'subject', 'studentName', 'rollNumber',
    'registrationNumber', 'teacherName', 'submittedTo', 'campusLocation', 'affiliation'
  ];

  fields.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;

    el.addEventListener('input', function () {
      const previewId = 'preview' + id.charAt(0).toUpperCase() + id.slice(1);
      const previewEl = document.getElementById(previewId);
      if (previewEl) previewEl.innerText = this.value;

      if (id === 'studentName') {
        const sb = document.getElementById('previewStudentBottom');
        if (sb) sb.textContent = (this.value || "").toUpperCase();
      }
      if (id === 'teacherName') {
        const tn = document.getElementById('previewTeacherName');
        if (tn) tn.innerText = '(' + (this.value || '') + ')';
      }
      if (id === 'affiliation') {
        const af = document.getElementById('previewAffiliation');
        if (af) af.innerText = '(' + (this.value || '') + ')';
      }
    });
  });

  /* ── LOGO UPLOAD (Centered) ── */
  const logoInput = document.getElementById('logoInput');
  if (logoInput) {
    logoInput.addEventListener('change', function (e) {
      const file = e.target.files[0];
      if (!file) return;

      document.getElementById('fileName').textContent = file.name;

      const reader = new FileReader();
      reader.onload = function (event) {
        const img = document.getElementById('logoPreview');
        if (img) {
          img.src = event.target.result;
          img.style.display = 'block'; 
          img.style.margin = '0 auto'; 
        }
      };
      reader.readAsDataURL(file);
    });
  }

  /* ── RESET DEFAULTS ── */
  window.resetDefaults = function () {
    const defaults = {
      universityName: 'Tribhuvan University',
      collegeName: 'Ramsagar Ramswarup Multiple Campus',
      collegeAddress: 'Janakpur -14, Dhanusha, Nepal',
      faculty: 'BSc.CSIT',
      department: 'Department of TUIOST',
      specificDepartment: 'Computer Science and Information Technology (BSc.CSIT)',
      semester: '3rd Semester',
      subject: 'Numerical Method',
      studentName: 'Pragyan Acharya',
      rollNumber: '',
      registrationNumber: '',
      teacherName: 'Prof. Ram Bahadur Thapa',
      submittedTo: 'Ramsagar Ramswarup Multiple Campus',
      campusLocation: 'Campus Chowk, Janakpur',
      affiliation: 'Affiliated To Tribhuvan University'
    };

    fields.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.value = defaults[id] || '';
        el.dispatchEvent(new Event('input'));
      }
    });

    const img = document.getElementById('logoPreview');
    if (img) img.src = 'logo.png';

    const fn = document.getElementById('fileName');
    if (fn) fn.textContent = 'Upload Logo (Optional)';
  };

})();