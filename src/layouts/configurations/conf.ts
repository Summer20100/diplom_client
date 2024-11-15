class Configuration {
  documentTitle(str: string) {
    return document.title = str;
  };

  accordeon(str: string) {
    const headers = Array.from(document.querySelectorAll(`.${str}`));
    headers.forEach(header => header.addEventListener('click', () => {
      header.classList.toggle(`${str}_closed`);
      header.classList.toggle(`${str}_opened`);
    }));
  }

  updateFavicon(iconUrl: string) {
    const link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
    if (link) {
      link.href = iconUrl;
    } else {
      const newLink = document.createElement("link");
      newLink.rel = "icon";
      newLink.href = iconUrl;
      document.head.appendChild(newLink);
    }
  };

  
}

export default new Configuration();