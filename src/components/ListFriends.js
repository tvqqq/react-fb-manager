import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import Loading from "../components/Loading";
import toast from "react-hot-toast";

const ListFriends = () => {
  const PATH = "/fb/friends";
  const [friends, setFriends] = useState([]);
  const [nextToken, setNextToken] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [fetch, setFetch] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.title = "React FB Manager";

    const fetchData = async () => {
      setIsLoading(true);

      const result = await axios(
        PATH + "/" + (search !== "" ? `?search=${search}` : "")
      );
      setFriends(result.data.data);
      setIsLoading(false);
    };

    fetchData();
  }, [fetch, search]);

  const loadMore = async () => {
    const result = await axios(
      PATH + "?page=" + nextToken + (search !== "" ? `&search=${search}` : "")
    );
    setFriends((f) => [...f, ...result.data.data]);
    setNextToken(nextToken + 1);
  };

  const [isShowUnf, setIsShowUnf] = useState(false);
  const showUnfriend = async () => {
    const status = !isShowUnf;
    setIsShowUnf(status);

    if (status) {
      const result = await axios(PATH + "/unf");
      setFriends(result.data.data);
    } else {
      setFetch((f) => !f);
    }
  };

  const changeHandler = async (event) => {
    setSearch(event.target.value);
  };

  const debouncedChangeHandler = useMemo(
    () => debounce(changeHandler, 1000),
    []
  );

  // Clear the debounce
  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    };
  });

  const [disabled, setDisabled] = useState(false);
  const updateFbFriends = async () => {
    const toastId = toast.loading("Loading...");
    setDisabled(true);

    try {
      const result = await axios(PATH + "/fetch");

      if (result.data.success) {
        toast.success("Done!", {
          id: toastId,
        });
      } else {
        toast.error(`Failed: ${result.data.message}`, {
          id: toastId,
        });
      }
      setDisabled(false);
    } catch (err) {
      toast.error(`${err}`, {
        id: toastId,
      });
      setDisabled(false);
    }
  };

  return (
    <>
      <div className="flex items-center w-3/5 mb-8 mx-auto">
        <div className="flex flex-wrap flex-1 relative items-stretch">
          <div className="flex -mr-px">
            <span className="flex items-center leading-normal bg-gray-200 rounded rounded-r-none border border-r-0 border-grey-light px-3 whitespace-no-wrap text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {"  "}
              Friend
            </span>
          </div>
          <input
            type="text"
            className="flex-shrink flex-grow flex-auto leading-normal w-px border h-10 border-grey-light rounded rounded-l-none px-3 relative focus:border-blue focus:shadow-md"
            placeholder="by name or id..."
            onChange={debouncedChangeHandler}
          />
        </div>
        <div className="flex ml-3 border-l-2 pl-3">
          <div
            className={`relative rounded-full w-12 h-6 transition duration-200 ease-linear" 
                  ${isShowUnf ? "bg-green-400" : "bg-gray-400"}`}
          >
            <label
              htmlFor="toggle"
              className={`absolute left-0 bg-white border-2 mb-2 w-6 h-6 rounded-full transition transform duration-100 ease-linear cursor-pointer ${
                isShowUnf
                  ? "translate-x-full border-green-400"
                  : "translate-x-0 border-gray-400"
              }`}
            ></label>
            <input
              type="checkbox"
              id="toggle"
              name="toggle"
              className="appearance-none w-full h-full active:outline-none focus:outline-none"
              onClick={showUnfriend}
            />
          </div>
          <span className="font-semibold ml-1">Show Unfriend 😒</span>
        </div>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="grid grid-cols-4 gap-12">
            {friends &&
              friends.map((friend) => (
                <div
                  className="p-2 rounded overflow-hidden shadow flex flex-col justify-center"
                  key={friend.fbId}
                >
                  <div className="mx-auto">
                    <img
                      src={friend.fbAvatar}
                      alt="fb_avatar"
                      className="object-scale-down w-32 h-32 mb-3"
                    />
                  </div>
                  <div className="flex items-center justify-center">
                    {friend.fbGender === "male" ? (
                      <span className="text-blue-400">♂</span>
                    ) : (
                      <span className="text-pink-400">♀</span>
                    )}
                    <span className="text-xl font-bold ml-1">
                      {friend.fbName}
                    </span>
                  </div>
                  <a
                    className="text-sm hover:text-blue-400"
                    href={`https://fb.com/${friend.fbId}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {friend.fbId}
                  </a>
                  {friend.unfDate && (
                    <div className="mt-1 flex flex-col">
                      <span>---</span>
                      <small className="text-red-600">
                        Unf Date: {friend.unfDate}
                      </small>
                    </div>
                  )}
                </div>
              ))}
          </div>
          <div className="flex flex-col mx-auto items-center my-3">
            {!isShowUnf && (
              <button
                className="my-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
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
            )}
            <button
              onClick={updateFbFriends}
              disabled={disabled}
              className="disabled:opacity-50
              bg-green-500 hover:bg-green-700 text-white 
              focus:outline-none focus:ring-2 focus:ring-green-900 focus:ring-opacity-50
              font-bold py-2 px-4 rounded inline-flex items-center"
            >
              Update FB Friends
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default ListFriends;
