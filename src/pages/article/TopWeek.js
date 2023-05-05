import React, { useEffect } from "react"
import { Loader } from "semantic-ui-react"
import useFetch from '@/hooks/useFetch'
import TeamArticle from '@/pages/article/TeamArticle'

const TopWeek = () => {
  const [result, load, loading] = useFetch()

  useEffect(() => {
    load({ url: "teams/top" })
  }, [])
  

  if(loading){
      return <Loader active inline="centered" />
  }

  return <TeamArticle result={result} />
}
export default TopWeek
