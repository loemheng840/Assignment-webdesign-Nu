// Main JavaScript file for Shelly School Center

document.addEventListener("DOMContentLoaded", () => {
  // Load header and footer components
  loadComponent("header-placeholder", "components/header.html")
  loadComponent("footer-placeholder", "components/footer.html")

  // Set active navigation link
  setActiveNavLink()

  // Initialize mobile menu
  initMobileMenu()

  // Initialize search functionality
  initSearch()

  // Initialize contact form
  initContactForm()

  // Initialize smooth scrolling
  initSmoothScrolling()

  // Initialize animations
  initAnimations()
})

// Load HTML components
function loadComponent(elementId, filePath) {
  const element = document.getElementById(elementId)
  if (element) {
    fetch(filePath)
      .then((response) => response.text())
      .then((html) => {
        element.innerHTML = html
        // Re-initialize mobile menu after header is loaded
        if (elementId === "header-placeholder") {
          setTimeout(() => {
            initMobileMenu()
            setActiveNavLink()
          }, 100)
        }
      })
      .catch((error) => {
        console.error("Error loading component:", error)
        element.innerHTML = "<p>Error loading component</p>"
      })
  }
}

// assets/js/main.js
// function loadComponent(selector, filePath) {
//   fetch(filePath)
//     .then(res => {
//       if (!res.ok) throw new Error(`Failed to fetch ${filePath}`);
//       return res.text();
//     })
//     .then(data => {
//       document.querySelector(selector).innerHTML = data;
//     })
//     .catch(err => console.error(err));
// }

// document.addEventListener("DOMContentLoaded", () => {
//   loadComponent("header", "../components/header.html");
//   loadComponent("footer", "../components/footer.html");
// });

// Set active navigation link based on current page
function setActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html"
  const navLinks = document.querySelectorAll(".nav-link")

  navLinks.forEach((link) => {
    link.classList.remove("active")
    const href = link.getAttribute("href")
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active")
    }
  })
}

// Initialize mobile menu functionality
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn")
  const mobileMenu = document.getElementById("mobile-menu")

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden")
      mobileMenu.classList.toggle("show")

      // Toggle hamburger icon
      const icon = mobileMenuBtn.querySelector("i")
      if (mobileMenu.classList.contains("hidden")) {
        icon.className = "fas fa-bars text-xl"
      } else {
        icon.className = "fas fa-times text-xl"
      }
    })

    // Close mobile menu when clicking on a link
    const mobileNavLinks = mobileMenu.querySelectorAll("a")
    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden")
        mobileMenu.classList.remove("show")
        const icon = mobileMenuBtn.querySelector("i")
        icon.className = "fas fa-bars text-xl"
      })
    })
  }
}

// Initialize search functionality
function initSearch() {
  const searchInputs = document.querySelectorAll('input[placeholder*="Search"]')
  const searchButtons = document.querySelectorAll("button")

  searchInputs.forEach((input) => {
    const searchButton =
      input.parentElement.querySelector("button") || input.parentElement.parentElement.querySelector("button")

    if (searchButton) {
      // Handle search button click
      searchButton.addEventListener("click", (e) => {
        if (searchButton.type !== "submit") {
          e.preventDefault()
          performSearch(input.value.trim())
        }
      })

      // Handle Enter key press
      input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          e.preventDefault()
          performSearch(input.value.trim())
        }
      })
    }
  })
}

// Perform search functionality
function performSearch(searchTerm) {
  if (searchTerm) {
    console.log("Searching for:", searchTerm)
    // Add your search logic here
    // For now, we'll just show an alert
    alert(`Searching for: ${searchTerm}`)
  }
}

// Initialize contact form
function initContactForm() {
  const contactForm = document.querySelector("form")
  if (contactForm && contactForm.querySelector("#firstName")) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const formData = new FormData(contactForm)
      const data = Object.fromEntries(formData)

      // Validate form
      if (validateContactForm(data)) {
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]')
        const originalText = submitBtn.textContent
        submitBtn.innerHTML = '<span class="loading"></span> Sending...'
        submitBtn.disabled = true

        // Simulate form submission
        setTimeout(() => {
          alert("Thank you for your message! We will get back to you soon.")
          contactForm.reset()
          submitBtn.textContent = originalText
          submitBtn.disabled = false
        }, 2000)
      }
    })
  }
}

// Validate contact form
function validateContactForm(data) {
  const required = ["firstName", "lastName", "email", "subject", "message"]
  const missing = required.filter((field) => !data[field] || data[field].trim() === "")

  if (missing.length > 0) {
    alert(`Please fill in the following required fields: ${missing.join(", ")}`)
    return false
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(data.email)) {
    alert("Please enter a valid email address.")
    return false
  }

  return true
}

// Initialize smooth scrolling for anchor links
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

// Initialize animations
function initAnimations() {
  // Add fade-in animation to elements when they come into view
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up")
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Observe elements that should animate
  const animateElements = document.querySelectorAll(".card-hover, .bg-white.rounded-lg, .grid > div")
  animateElements.forEach((el) => observer.observe(el))
}

// Utility function to debounce function calls
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Handle window resize events
window.addEventListener(
  "resize",
  debounce(() => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth >= 768) {
      const mobileMenu = document.getElementById("mobile-menu")
      const mobileMenuBtn = document.getElementById("mobile-menu-btn")
      if (mobileMenu && mobileMenuBtn) {
        mobileMenu.classList.add("hidden")
        mobileMenu.classList.remove("show")
        const icon = mobileMenuBtn.querySelector("i")
        if (icon) icon.className = "fas fa-bars text-xl"
      }
    }
  }, 250),
)

// Add loading states to buttons
document.addEventListener("click", (e) => {
  if (e.target.matches("button.btn-primary") && !e.target.disabled) {
    e.target.style.transform = "scale(0.98)"
    setTimeout(() => {
      e.target.style.transform = ""
    }, 150)
  }
})
// Console welcome message
console.log("%c🍃 Welcome to Shelly School Center! 🍃", "color: #FF6B35; font-size: 16px; font-weight: bold;")
console.log("%cBuilt with HTML, Tailwind CSS, and JavaScript", "color: #4ECDC4; font-size: 12px;")



