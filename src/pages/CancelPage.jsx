/* eslint-disable react/no-unescaped-entities */
import { useContext, useEffect } from "react";
import backgroundImage from "../assets/images/leaves_background_02.webp";
import { HiHome } from "react-icons/hi";
import PageBreadcrumb from "../components/PageBreadcrumb";
import EachPageHeader from "../components/EachPageHeader";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import { AuthContext } from "../contexts/AuthContext";

const CancelPage = () => {
  const {
    handleStripeSession,
    handleOrderGrandPrice,
    handleOrder,
    handlePatronInfo,
  } = useContext(AuthContext);

  useEffect(() => {
    document.title = "Payment Unsuccessful";
    handleStripeSession({ type: "RESET_SESSION" });
    handleOrderGrandPrice({ type: "RESET_GRAND_PRICE" });
    handleOrder({ type: "REMOVE_ITEMS" });
    handlePatronInfo({ type: "REMOVE_PATRON" });
  }, []);
  const titles = ["Payment Unsuccessful"];
  const aLinkValues = [{ linkTo: "/", linkIcon: HiHome, linkText: "Home" }];
  const daLinkValues = { linkText: "Payment Unsuccessful" };

  return (
    <main className="relative text-font-family-color">
      <PageBreadcrumb activeLinks={aLinkValues} deActiveLink={daLinkValues} />
      {/* Payment Unsuccessful title, positioned absolutely */}
      <h2 className="absolute top-0 left-1/2 transform -translate-x-1/2 py-10 text-center z-10">
        <EachPageHeader title={titles[0]} subtitle={titles[1]} />
      </h2>
      <section className="relative flex flex-col items-center justify-center pt-[100px] md:pt-[160px] lg:pt-[180px] xl:pt-[220px]">
        {/* Overlay with background image and opacity */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat bg-center"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            opacity: 0.2,
          }}
        ></div>

        {/*  Payment Unsuccessful Message Content */}

        <div className="max-w-6xl mx-auto px-4 py-8 md:p-8 bg-white rounded-xl shadow-lg my-10 z-10">
          <div className="text-center mt-6">
            {/* <h2 className="text-2xl md:text-3xl font-semibold mb-10">
              Payment Unsuccessful
            </h2> */}
            <p className="text-md md:text-lg">
              Unfortunately, your payment could not be processed at this time.
              This might be due to a network issue, incorrect payment details,
              or an interruption during the transaction. We encourage you to try
              again or check with your bank if the problem persists.
            </p>
            <p className="text-md md:text-lg mt-4">
              We appreciate your intention to support our mission. Your
              contribution is important to us, and we're here to help if you
              encounter any further issues. Please don't hesitate to{" "}
              <Link to="/contact" className="underline">
                contact us
              </Link>{" "}
              for assistance.
            </p>
            <div className="flex justify-center mt-10">
              <Button className="custom-button-style px-4 py-2 md:px-6 md:py-3">
                <Link
                  to="/trees"
                  className="text-md md:text-lg text-secondary-color font-bold"
                >
                  Try Again
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Image */}
      <img
        className="w-full"
        src="src/assets/images/news_images/leaves_background.png"
        alt="Payment Unsuccessful Footer Image"
      />
    </main>
  );
};

export default CancelPage;
