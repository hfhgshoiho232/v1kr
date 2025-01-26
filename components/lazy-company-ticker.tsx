import dynamic from "next/dynamic"

const CompanyTicker = dynamic(() => import("./company-ticker"), {
  loading: () => <p>Loading...</p>,
})

export default CompanyTicker

