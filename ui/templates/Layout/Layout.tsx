import { Header } from "../../molecules";

interface Props {
  children?: React.ReactNode;
  title?: string;
}

export const Layout = ({children, title = 'Main Page'}: Props) => {
  return (
  <>
    <Header title={title} />
    <div className="content">
      {children}
    </div>
  </>
  )
}
