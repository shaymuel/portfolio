const weeklyLinks = [
    {
      label: "Week 1 Notes",
      url: "week1/index.html"
    },
    {
      label: "Week 2 Notes",
      url: "week2/index.html"
    },
    {
      label: "Week 3 Notes",
      url: "week3/index.html"
    },
    {
      label: "Week 4 Notes",
      url: "week4/index.html"
    },
    {
      label: "Week 5 Notes",
      url: "week5/index.html"
    },
    {
      label: "To Do List",
      url: "Challenge1_toDoList/index.html"
    },
    {
      label: "Week 7 Notes",
      url: "week7/index.html"
    },
    {
      label: "Week 8 Notes",
      url: "week8/index.html"
    },
    {
      label: "Week 9 Notes",
      url: "week9/index.html"
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

