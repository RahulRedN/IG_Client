import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from ".././theme";
import ProgressCircle from "./ProgressCircle";

const StatBox = ({ title, subtitle, icon, progress, increase }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 0">
      <Box
        display="flex"
        gap="20px"
        alignItems="center"
        justifyContent="center"
      >
        {icon}
        <Box display="flex" justifyContent="space-around" alignItems="center">
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: "#25cc8b" }}
          >
            {title}
            <Typography variant="h5" sx={{ color: "#0284c7" }}>
              {subtitle}
            </Typography>
          </Typography>
        </Box>
        {/* <Box display="flex" flexDirection="column" justifyContent="flex-start">
          <Box>
            <ProgressCircle progress={progress} />
          </Box>
          <Typography
            variant="h5"
            fontStyle="italic"
            sx={{ color: colors.greenAccent[600] }}
          >
            {increase}
          </Typography>
        </Box> */}
      </Box>
    </Box>
  );
};

export default StatBox;
{
  /* <Box display="flex" justifyContent="space-between" alignItems="center" mt="2px">

<Box display="flex" justifyContent="space-around">
    {icon}
  <Box>
    <Typography variant="h4" fontWeight="bold" sx={{ color: colors.grey[100] }}>
      {title} 
  </Typography>
  <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
    {subtitle}
    </Typography>
  </Box> 
</Box>
  <Box display="flex" flexDirection="column" justifyContent="flex-start">
    <Box>
      <ProgressCircle progress={progress} />
    </Box>
    <Typography
    variant="h5"
    fontStyle="italic"
    sx={{ color: colors.greenAccent[600] }}
  >
    {increase}
  </Typography>
  </Box>



</Box> */
}
