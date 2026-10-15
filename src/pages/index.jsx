import Ambient from "../components/Ambient";
import Scrapbook from "../components/Scrapbook";
import Splash from "../components/Splash";

export default function Index() {
  return (
    <>
      <Ambient />
      <main className="relative z-10">
        <Scrapbook />
      </main>
      <Splash />
    </>
  );
}
