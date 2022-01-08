const weeklyLinks = [
    {
      label: "Week 1 Notes",
      url: "week1/index.html"
    },
    {
      label: "Week 2 Notes",
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
