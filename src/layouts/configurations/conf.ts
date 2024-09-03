class Configuration {
  documentTitle(str: string) {
    return document.title = str;
  }

  
  // open admin componens like accordeon. file 'Admin.tsx'
  accordeon(str: string) {
    const headers = Array.from(document.querySelectorAll(`.${str}`));
    headers.forEach(header => header.addEventListener('click', () => {
      header.classList.toggle(`${str}_closed`);
      header.classList.toggle(`${str}_opened`);
    }));
  }

  
}

export default new Configuration();