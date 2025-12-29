class ResumeDataLoader {
  constructor() {
    this.data = null;
  }

  async loadData() {
    try {
      const response = await fetch("../data/resume-data.json");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      this.data = await response.json();
      return this.data;
    } catch (error) {
      console.error("Error loading resume data:", error);
      // Fallback to local data if fetch fails
      this.data = window.resumeDataFallback;
      return this.data;
    }
  }

  getPersonalInfo() {
    return this.data?.personal || {};
  }

  getExperience() {
    return this.data?.experience || [];
  }

  getProjects() {
    return this.data?.projects || [];
  }

  getSkills() {
    return this.data?.skills || {};
  }

  getEducation() {
    return this.data?.education || [];
  }

  getCertifications() {
    return this.data?.certifications || [];
  }

  // Render methods for common components
  renderSkills(skills) {
    if (!skills) return "";

    let html = "";

    if (skills.technical && skills.technical.length > 0) {
      html += `<div class="skill-category">
                <h4>Technical</h4>
                <div class="skill-tags">`;
      skills.technical.forEach((skill) => {
        html += `<span class="skill-tag">${skill}</span>`;
      });
      html += `</div></div>`;
    }

    if (skills.ai_ml && skills.ai_ml.length > 0) {
      html += `<div class="skill-category">
                <h4>AI/ML</h4>
                <div class="skill-tags">`;
      skills.ai_ml.forEach((skill) => {
        html += `<span class="skill-tag">${skill}</span>`;
      });
      html += `</div></div>`;
    }

    if (skills.professional && skills.professional.length > 0) {
      html += `<div class="skill-category">
                <h4>Professional</h4>
                <div class="skill-tags">`;
      skills.professional.forEach((skill) => {
        html += `<span class="skill-tag">${skill}</span>`;
      });
      html += `</div></div>`;
    }

    return html;
  }

  renderExperience(experience) {
    if (!experience || experience.length === 0) return "";

    let html = "";
    experience.forEach((job) => {
      html += `<div class="experience-item">
                <h3 class="job-title">${job.position}</h3>
                <div class="company">${job.company}</div>
                <div class="date">${job.period}</div>
                <ul class="bullet-list">`;

      job.achievements.forEach((achievement) => {
        html += `<li>${achievement}</li>`;
      });

      if (job.results && job.results.length > 0) {
        html += `<div class="result-highlight">`;
        job.results.forEach((result) => {
          html += `<p><strong>✓ Result:</strong> ${result}</p>`;
        });
        html += `</div>`;
      }

      html += `</ul></div>`;
    });

    return html;
  }

  renderProjects(projects) {
    if (!projects || projects.length === 0) return "";

    let html = "";
    projects.forEach((project) => {
      html += `<div class="project-item">
                <h3 class="project-title">${project.name}</h3>
                <div class="project-tech">${project.tech}</div>
                <p class="project-description">${project.description}</p>`;

      if (project.links) {
        html += `<div class="project-links">`;
        if (project.links.demo) {
          html += `<a href="${project.links.demo}" class="project-link">Live Demo</a>`;
        }
        if (project.links.github) {
          html += `<a href="${project.links.github}" class="project-link">GitHub</a>`;
        }
        html += `</div>`;
      }

      html += `</div>`;
    });

    return html;
  }
}

// Create global instance
const resumeLoader = new ResumeDataLoader();

// Fallback data in case JSON file is not accessible
window.resumeDataFallback = {
  personal: {
    name: "Saurav Chaudhari",
    title: "Full Stack Developer",
    phone: "+91 8329373390",
    email: "chaudharisaurav356@gmail.com",
    location: "Pune, Maharashtra",
    summary: "Innovative Full Stack Developer with 3 years of experience...",
  },
  experience: [],
  projects: [],
  skills: {},
  education: [],
  certifications: [],
};
