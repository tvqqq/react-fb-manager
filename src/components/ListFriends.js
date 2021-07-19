import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";

const ListFriends = () => {
  const PATH = "/list";
  const [friends, setFriends] = useState([]);
  const [nextToken, setNextToken] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const result = await axios(PATH);
      setFriends(result.data.data);
      setNextToken(result.data.next);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const loadMore = async () => {
    const result = await axios(PATH + `?next=${nextToken}`);
    setFriends((f) => [...f, ...result.data.data]);
    setNextToken(result.data.next);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="grid grid-cols-4 gap-12">
            {friends &&
              friends.map((friend) => (
                <div
                  className="p-2 rounded overflow-hidden shadow flex flex-col justify-center"
                  key={friend.fb_id}
                >
                  <div className="mx-auto">
                    <img
                      src={friend.fb_avatar}
                      alt="fb_avatar"
                      className="object-scale-down w-32 h-32 mb-3"
                    />
                  </div>
                  <div className="flex items-center justify-center">
                    {friend.fb_gender === "male" ? (
                      <span className="text-blue-400">♂</span>
                    ) : (
                      <span className="text-pink-400">♀</span>
                    )}
                    <span className="text-xl font-bold ml-1">
                      {friend.fb_name}
                    </span>
                  </div>
                  <a
                    className="text-sm hover:text-blue-300"
                    href={`https://fb.com/${friend.fb_id}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {friend.fb_id}
                  </a>
                </div>
              ))}
          </div>
          <button
            className="my-5 bg-blue-500 hover:bg-blue-700 text-white font-bol py-2 px-4 rounded inline-flex items-center"
            onClick={loadMore}
          >
            Load More{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
              />
            </svg>
          </button>
        </>
      )}
    </>
  );
};

export default ListFriends;
