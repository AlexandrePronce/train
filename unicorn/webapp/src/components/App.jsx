import React, { useContext } from 'react';
import { Routes, Route, useMatch, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd'
import Help from './Help/help';
import Home from './Home/Home';
import AllUnicorns from './Licornes/allUnicorns';
import SaleUnicorns from './Licornes/SaleUnicorns';
import { Context } from 'contexts/unicornsContext';
import DisplayUnicorn from './Licornes/DisplayUnicorn';
const { Header, Content } = Layout
const App = () => {
  const{unicorns} = useContext(Context);
  const match = useMatch('/SaleUnicorns/:id');
  const currentUnicorn =
  match ? unicorns.find((lic) => lic.id === match.params.id) : undefined;
  return (
    <Layout className="layout">
      <Header>
        <Menu theme="dark" mode="horizontal" selectedKeys={[]}>
          <Menu.Item><Link to="/">Home</Link></Menu.Item>         
          <Menu.Item><Link to="/AllUnicorns">licornes</Link></Menu.Item>
          <Menu.Item><Link to="/SaleUnicorns">vendre une licorne</Link></Menu.Item>
          <Menu.Item><Link to="/Help">aide</Link></Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '30px 50px' }}>
      </Content>
      <Routes>
      <Route path="/Help" element={<Help/>} />
      <Route path="/AllUnicorns" element={<AllUnicorns/>} />
      <Route path="/SaleUnicorns" element={<SaleUnicorns/>} />
      <Route
            path="/SaleUnicorns/:id"
            element={<DisplayUnicorn uni={currentUnicorn} />}
          />
      <Route path="/" element={<Home/>} />
      </Routes>
    </Layout>
  )
}

export default App
