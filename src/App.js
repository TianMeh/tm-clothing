

const App = () => {
const categories = [
    {
      id: 1,
      title: "hats",
    },
    {
      id: 1,
      title: "Jackets",
    },
    {
      id: 1,
      title: "Sneakers",
    },
    {
      id: 1,
      title: "Womens",
    },
    {
      id: 1,
      title: "Mens",
    },
  ];

  return (
    <div className="categories-container">
      {categories.map(({ title, id }) => (
        <div key={id} className="category-container">
          <div className="background-image"/>
          <div className="category-body-container">
            <h1>{title}</h1>
            <p>Shop Now</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
