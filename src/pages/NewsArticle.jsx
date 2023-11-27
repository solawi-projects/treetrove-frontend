import leavesBackground from "../assets/images/news_images/leaves_background.png";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";
import DOMPurify from "dompurify";
import PageBreadcrumb from "../components/PageBreadcrumb";
import EachPageHeader from "../components/EachPageHeader";
import { Button, Checkbox, Label, TextInput, Breadcrumb } from "flowbite-react";

const NewsArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`/api/newsArticle/${id}`);
        setArticle(response.data);
      } catch (error) {
        console.error("Error fetching article:", error);
        setError("Error fetching article");
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  // Go back function

  const goBack = () => {
    navigate(-1);
  };

  if (isLoading)
    return (
      <div className="text-center text-lg font-semibold mt-10">Loading...</div>
    );
  if (error)
    return (
      <div className="text-red-600 text-center text-lg font-semibold mt-10">
        {error}
      </div>
    );
  if (!article)
    return (
      <div className="text-gray-500 text-center text-lg font-semibold mt-10">
        No article found.
      </div>
    );

  if (!article.writer)
    return (
      <div className="text-gray-500 text-center text-lg font-semibold mt-10">
        Writer information is not available.
      </div>
    );

  // Breadcrumb links
  const breadcrumbLinks = [
    { linkTo: "/", linkText: "Home" },
    { linkTo: "/news", linkText: "News" },
  ];

  return (
    <div className="bg-bg-page-color">
      {article && (
        <PageBreadcrumb
          activeLinks={breadcrumbLinks}
          deActiveLink={{ linkText: article.title }}
        />
      )}
      <EachPageHeader title={article.title} />
      <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-lg my-10">
        {article && (
          <>
            <img
              className="w-full h-auto object-cover rounded-t-xl"
              src={article.imageUrl}
              alt={article.title}
            />
            <div className="px-6 py-4">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {article.title}
              </h1>
              <p className="text-md text-gray-600 mb-4">
                By{" "}
                <span className="font-semibold">
                  {article.writer.firstName} {article.writer.lastName}
                </span>
                on{" "}
                <span className="font-semibold">
                  {new Date(article.dateCreated).toDateString()}
                </span>
              </p>
              <div
                className="prose lg:prose-lg mb-6"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(article.content),
                }}
              />
              <button
                onClick={goBack}
                style={{ backgroundColor: "#5a6448" }}
                className="inline-block text-white font-medium py-2 px-4 rounded hover:bg-opacity-90 transition duration-300"
              >
                ← Go Back
              </button>
            </div>
          </>
        )}
      </div>
      <img className="w-full" src={leavesBackground} alt="Footer background" />
    </div>
  );
};

export default NewsArticle;
