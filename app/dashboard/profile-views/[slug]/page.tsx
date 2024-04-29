interface IParams {
  params: {
    slug: string;
  };
}

const ProfileViews = ({ params: { slug } }: IParams) => {
  return <div>ProfileView for {slug}</div>;
};

export default ProfileViews;
