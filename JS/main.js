const weeklyLinks = [
    {
      label: "Week 1 notes",
      url: "week1/index.html"
    },
    {
      label: "Week 2 notes",
      url: "week2/index.html"
    }
  ]

  for (let i = 0; i < weeklyLinks.length; i++) {
    const list = document.querySelector('ul');
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.textContent = weeklyLinks[i].label;
    link.href = weeklyLinks[i].url;
    list.appendChild(listItem);
    listItem.appendChild(link);
  }

