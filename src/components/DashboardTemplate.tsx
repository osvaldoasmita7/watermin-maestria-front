import { useState } from "react";
import { Layout, Menu, theme } from "antd";
import { FooterDashboard } from "./FooterDashboard";
import { RouterHeader } from "./RouterHeader";
import { MenuItem } from "../data/itemsMenu";

const { Header, Content, Sider } = Layout;

interface Props {
  withRouteHeader?: boolean;
  itemsHeader: MenuItem[];
  children?: any;
  routes?: string[];
}
export const DashboardTemplate = ({
  children,
  itemsHeader,
  withRouteHeader,
  routes,
}: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={itemsHeader}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>
          {withRouteHeader && <RouterHeader routes={routes || []} />}

          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <FooterDashboard></FooterDashboard>
      </Layout>
    </Layout>
  );
};
