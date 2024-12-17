import { CategoryList } from "../components/CategoryList";

function Home(props) {
  const { filteredCatalog } = props;
  const items = filteredCatalog.length > 0 ? filteredCatalog : [];

  return (
    <CategoryList catalog={items} />
  );
}

export { Home };
