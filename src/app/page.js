import Banner from "../components/Banner";
import Header from "../components/Header";
import SpecialityMenu from "../components/SpecialityMenu";
import TopDoctors from "../components/TopDoctors";

export default function Home() {
  return (
    <div className="">
      <Header />
      <SpecialityMenu />
      <TopDoctors />
      <Banner />
    </div>
  );
}
