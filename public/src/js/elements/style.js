
/* IMAGE CONTROLLER */

jscss.add("image-ctrlr", {
    display: "block",
    overflow: "hidden",
    position: "relative",
    background_size: "cover",
    background_position: "center",
    background_color : new Color(0, 0, 0)
});

jscss.add("image-ctrlr>.image-download", {
    position: "absolute",
    right: "-30px",
    top: "-30px",
    width: "30px",
    height: "30px"
});

jscss.add("image-ctrlr:hover>.image-download", {
    right: "10px",
    top: "10px",
});

jscss.add("image-ctrlr::after", {
    content: "attr(width)'x'attr(height)",
    display: "block",

    position: "absolute",
    bottom: "-50px",
    left: 0,

    text_align: "center",
    font_size: "2em",

    width: "100%",
    height: "50px",

    transition: '1s'
});

jscss.add("image-ctrlr:hover::after", {
    bottom: 0,
});
