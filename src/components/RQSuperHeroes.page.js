import axios from "axios";
import { useQuery } from "react-query";

const fetchSuperHero = () => {
  return axios.get("http://localhost:4000/superheroes");
};

export const RQSuperHeroesPage = () => {
  const onSuccess = () => {
    console.log("Data fetching is successfully");
  };

  const onError = () => {
    console.log("Error while Fetching The Data");
  };

  const { isLoading, data, isError, error, isFetching } = useQuery(
    // refetch
    "super-heroes",
    fetchSuperHero,
    {
      cacheTime: 5000, // To Give Specific Time To Remove the Catch
      // staleTime: 30, // Do not the fetch updated data from the api till the 30 sec
      // refetchOnMount: false  // do not fetch the. means fetch the data first time  This is polling
      // refetchOnWindowFocus: true,  // To Give the Real time update means api sync with the app.
      // refetchInterval : 2000, // it the means fetch data in particular interval of time 2sec.
      // enabled: false, // when we want to get the data by onclick
      onError,
      onSuccess,
      // select : (data) => {      use of this is to simple give the api value to another object.
      //    const superHeroName = data.data.map((hero) => hero.name);
      //    return superHeroName;
      // }
    }
    // WE can also create a Custom Hook to handle Multiple API
  );

  if (isLoading || isFetching) {
    return <h2>Loading.....</h2>;
  }

  if (isError) {
    return <h>{error.message}</h>;
  }

  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      {/* <button onClick={refetch}>Fetch Data</button> */}
      {data?.data.map((hero) => {
        return <div key={hero.name}>{hero.name}</div>;
      })}
    </>
  );
};
