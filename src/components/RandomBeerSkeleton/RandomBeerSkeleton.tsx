import Skeleton from "@mui/material/Skeleton";
import RandomBeerSkeletonStyled from "./RandomBeerSkeletonStyled";

const RandomBeerSkeleton = () => {
  return (
    <RandomBeerSkeletonStyled
      component="article"
      width="100%"
      sx={{ maxWidth: "100" }}
      aria-label="Loading beer information"
    >
      <Skeleton
        variant="text"
        width={"100%"}
        height={36}
        style={{ maxWidth: "400px" }}
      />
      <div className="skeleton__body">
        <Skeleton
          variant="rectangular"
          width="100%"
          height={200}
          className="skeleton__image"
        />
        <div style={{ width: "100%" }}>
          <Skeleton variant="text" animation="wave" width="100%" />
          <Skeleton variant="text" animation="wave" width="100%" />
          <Skeleton variant="text" animation="wave" width="100%" />
          <Skeleton variant="text" animation="wave" width="100%" />
        </div>
      </div>
    </RandomBeerSkeletonStyled>
  );
};

export default RandomBeerSkeleton;
