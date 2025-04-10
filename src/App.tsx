import { Authenticated, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  AuthPage,
  ErrorComponent,
  ThemedLayoutV2,
  ThemedSiderV2,
  useNotificationProvider,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { dataProvider, liveProvider } from "@refinedev/supabase";
import { App as AntdApp } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import authProvider from "./authProvider";
import { AppIcon } from "./components/app-icon";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import {
  BlogPostCreate,
  BlogPostEdit,
  BlogPostList,
  BlogPostShow,
} from "./pages/blog-posts";
import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
  CategoryShow,
} from "./pages/categories";
import {
  SlideCreate,
  SlideEdit,
  SlideList,
  SlideShow,
} from "./pages/slides";
import { supabaseClient } from "./utility";
import {
  TenderList,
  TenderCreate,
  TenderEdit,
  TenderShow,
} from "./pages/tenders";
import {
  TenderCategoryList,
  TenderCategoryCreate,
  TenderCategoryEdit,
  TenderCategoryShow,
} from "./pages/tender-categories";
import { MembersTenderList } from "./pages/members-tenders/list";
import { MembersTenderCreate } from "./pages/members-tenders/create";
import { MembersTenderEdit } from "./pages/members-tenders/edit";
import { MembersTenderShow } from "./pages/members-tenders/show";
import { MembersTenderCategoryList } from "./pages/members-tender-categories/list";
import { MembersTenderCategoryCreate } from "./pages/members-tender-categories/create";
import { MembersTenderCategoryEdit } from "./pages/members-tender-categories/edit";
import { MembersTenderCategoryShow } from "./pages/members-tender-categories/show";
import { UsersList } from "./pages/users";
import { UserOutlined } from "@ant-design/icons";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <AntdApp>
            <Refine
              dataProvider={dataProvider(supabaseClient)}
              liveProvider={liveProvider(supabaseClient)}
              authProvider={authProvider}
              routerProvider={routerBindings}
              notificationProvider={useNotificationProvider}
              resources={[
                {
                  name: "blog_posts",
                  list: "/blog-posts",
                  create: "/blog-posts/create",
                  edit: "/blog-posts/edit/:id",
                  show: "/blog-posts/show/:id",
                  meta: {
                    canDelete: true,
                    label: "Blog Posts",
                    pluralLabel: "Blog Posts",
                    titleInList: "Blog Posts",
                    titleInCreate: "Create Blog Post",
                    titleInEdit: "Edit Blog Post",
                    titleInShow: "Blog Post Details",
                  },
                },
                {
                  name: "categories",
                  list: "/categories",
                  create: "/categories/create",
                  edit: "/categories/edit/:id",
                  show: "/categories/show/:id",
                  meta: {
                    canDelete: true,
                    label: "Categories",
                    pluralLabel: "Categories",
                    titleInList: "Categories",
                    titleInCreate: "Create Category",
                    titleInEdit: "Edit Category",
                    titleInShow: "Category Details",
                  },
                },
                {
                  name: "slides",
                  list: "/slides",
                  create: "/slides/create",
                  edit: "/slides/edit/:id",
                  show: "/slides/show/:id",
                  meta: {
                    canDelete: true,
                    label: "Slider",
                    pluralLabel: "Slider",
                    titleInList: "Slider",
                    titleInCreate: "Create Slide",
                    titleInEdit: "Edit Slide",
                    titleInShow: "Slide Details",
                    icon: <i className="fa fa-images" />,
                  },
                },
                {
                  name: "tenders",
                  list: "/tenders",
                  create: "/tenders/create",
                  edit: "/tenders/edit/:id",
                  show: "/tenders/show/:id",
                  meta: {
                    canDelete: true,
                    label: "Tenders",
                    pluralLabel: "Tenders",
                    titleInList: "Tenders",
                    titleInCreate: "Create Tender",
                    titleInEdit: "Edit Tender",
                    titleInShow: "Tender Details",
                    icon: <i className="fa fa-file-contract" />,
                  },
                },
                {
                  name: "tender_categories",
                  list: "/tender-categories",
                  create: "/tender-categories/create",
                  edit: "/tender-categories/edit/:id",
                  show: "/tender-categories/show/:id",
                  meta: {
                    canDelete: true,
                    label: "Tender Categories",
                    pluralLabel: "Tender Categories",
                    titleInList: "Tender Categories",
                    titleInCreate: "Create Tender Category",
                    titleInEdit: "Edit Tender Category",
                    titleInShow: "Tender Category Details",
                    icon: <i className="fa fa-folder" />,
                  },
                },
                {
                  name: "members_tenders",
                  list: "/members-tenders",
                  create: "/members-tenders/create",
                  edit: "/members-tenders/edit/:id",
                  show: "/members-tenders/show/:id",
                  meta: {
                    canDelete: true,
                    label: "Members' Tenders",
                    pluralLabel: "Members' Tenders",
                    titleInList: "Members' Tenders",
                    titleInCreate: "Create Members' Tender",
                    titleInEdit: "Edit Members' Tender",
                    titleInShow: "Members' Tender Details",
                    icon: <i className="fa fa-handshake" />,
                  },
                },
                {
                  name: "members_tender_categories",
                  list: "/members-tender-categories",
                  create: "/members-tender-categories/create",
                  edit: "/members-tender-categories/edit/:id",
                  show: "/members-tender-categories/show/:id",
                  meta: {
                    canDelete: true,
                    label: "Members' Tender Categories",
                    pluralLabel: "Members' Tender Categories",
                    titleInList: "Members' Tender Categories",
                    titleInCreate: "Create Members' Tender Category",
                    titleInEdit: "Edit Members' Tender Category",
                    titleInShow: "Members' Tender Category Details",
                    icon: <i className="fa fa-folder" />,
                  },
                },
                {
                  name: "users",
                  list: "/users",
                  meta: {
                    canDelete: false,
                    label: "Users",
                    pluralLabel: "Users",
                    titleInList: "Users Management",
                    icon: <UserOutlined />,
                  },
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                useNewQueryKeys: true,
                title: { icon: <AppIcon />, text: "" }
              }}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated
                      key="authenticated-inner"
                      fallback={<CatchAllNavigate to="/login" />}
                    >
                      <ThemedLayoutV2
                        Header={Header}
                        Sider={(props) => <ThemedSiderV2 {...props} fixed />}
                      >
                        <Outlet />
                      </ThemedLayoutV2>
                    </Authenticated>
                  }
                >
                  <Route
                    index
                    element={<NavigateToResource resource="blog_posts" />}
                  />
                  <Route path="/blog-posts">
                    <Route index element={<BlogPostList />} />
                    <Route path="create" element={<BlogPostCreate />} />
                    <Route path="edit/:id" element={<BlogPostEdit />} />
                    <Route path="show/:id" element={<BlogPostShow />} />
                  </Route>
                  <Route path="/categories">
                    <Route index element={<CategoryList />} />
                    <Route path="create" element={<CategoryCreate />} />
                    <Route path="edit/:id" element={<CategoryEdit />} />
                    <Route path="show/:id" element={<CategoryShow />} />
                  </Route>
                  <Route path="/slides">
                    <Route index element={<SlideList />} />
                    <Route path="create" element={<SlideCreate />} />
                    <Route path="edit/:id" element={<SlideEdit />} />
                    <Route path="show/:id" element={<SlideShow />} />
                  </Route>
                  <Route path="/tenders">
                    <Route index element={<TenderList />} />
                    <Route path="create" element={<TenderCreate />} />
                    <Route path="edit/:id" element={<TenderEdit />} />
                    <Route path="show/:id" element={<TenderShow />} />
                  </Route>
                  <Route path="/tender-categories">
                    <Route index element={<TenderCategoryList />} />
                    <Route path="create" element={<TenderCategoryCreate />} />
                    <Route path="edit/:id" element={<TenderCategoryEdit />} />
                    <Route path="show/:id" element={<TenderCategoryShow />} />
                  </Route>
                  <Route path="/members-tenders">
                    <Route index element={<MembersTenderList />} />
                    <Route path="create" element={<MembersTenderCreate />} />
                    <Route path="edit/:id" element={<MembersTenderEdit />} />
                    <Route path="show/:id" element={<MembersTenderShow />} />
                  </Route>
                  <Route path="/members-tender-categories">
                    <Route index element={<MembersTenderCategoryList />} />
                    <Route path="create" element={<MembersTenderCategoryCreate />} />
                    <Route path="edit/:id" element={<MembersTenderCategoryEdit />} />
                    <Route path="show/:id" element={<MembersTenderCategoryShow />} />
                  </Route>
                  <Route path="/users">
                    <Route index element={<UsersList />} />
                  </Route>
                  <Route path="*" element={<ErrorComponent />} />
                </Route>
                <Route
                  element={
                    <Authenticated
                      key="authenticated-outer"
                      fallback={<Outlet />}
                    >
                      <NavigateToResource />
                    </Authenticated>
                  }
                >
                  <Route
                    path="/login"
                    element={
                      <AuthPage
                        type="login"
                        title="Login to GTEF Admin Panel"
                        formProps={{
                          initialValues: {
                            email: "",
                            password: "",
                          },
                        }}
                      />
                    }
                  />
                  <Route
                    path="/register"
                    element={<AuthPage type="register" />}
                  />
                  <Route
                    path="/forgot-password"
                    element={<AuthPage type="forgotPassword" />}
                  />
                </Route>
              </Routes>

              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
          </AntdApp>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
