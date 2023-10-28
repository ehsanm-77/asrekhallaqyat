import Sidebar from './sidebar';
import Cards from './cards';
interface props {
  data: { data: any; quantity: number }[];
}
const index = ({ data }: props) => {
  return (
    <div className="flex lg:flex-row flex-col gap-3 py-10 ">
      <Cards data={data} />
      <Sidebar data={data} />
    </div>
  );
};

export default index;
