import { Mui } from "../../../theme";
import { useDispatch, useSelector } from "react-redux";
import type { State } from "../../../core/CommonInterface";
import { handleLoading } from "../../../core/Common";

const BlogMain = () => {
  const dispatch = useDispatch();
  const isLoading =  useSelector((state: State) => state?.commonMethods?.isLoader);
  return (
    <>
      <Mui.Box sx={{ p: 1, height: "100%" }}>
        <Mui.Box
          sx={{
            position: "relative",
            overflow: "hidden",
            width: "100%",
            height: isLoading ? "calc(100vh - 200px)" : "0px",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 1,
            boxShadow: 3,
          }}
        >
          <iframe
            src="https://react.dev"
            title="React Documentation"
            width="100%"
            height="100%"
            style={{ border: "none" }}
            onLoad={() => dispatch(handleLoading(true))}
            allowFullScreen
          />
        </Mui.Box>

        <Mui.Typography variant="caption" sx={{ mt: 1, display: "block" }}>
          Note: Some features may be limited in the embedded view. For full
          functionality, visit the{" "}
          <Mui.Link
            href="https://react.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            official React website
          </Mui.Link>
          .
        </Mui.Typography>
      </Mui.Box>
      <Mui.Box>
        <Mui.Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={!isLoading}
        >
          <Mui.CircularProgress color="inherit" />
        </Mui.Backdrop>
      </Mui.Box>
    </>
  );
};

export default BlogMain;
