import getData from '@/api/getData';
import { FinalForm } from '@/page/user';
import { userType } from '@/types/type';
import { parseCookies } from 'nookies';
interface props {
  user: userType;
}
const final = ({ user }: props) => {
  return (
    <div className="lg:container lg:mx-auto px-4">
      <FinalForm userData={user} />
    </div>
  );
};

export default final;

export const getServerSideProps = async (context) => {
  const cookies = parseCookies(context);
  const userId = cookies['id'];

  if (!userId) {
    // Redirect to login page or handle the absence of userId
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const InformationUser = await getData(`users/${userId}`).then(
    (res) => res.data.user
  );
  try {
    return { props: { user: InformationUser } };
  } catch (error) {
    console.log(error);
    return { props: { InformationUser: null } };
  }
};

final.getLayout = function PageLayout(page: any) {
  return <>{page}</>;
};
