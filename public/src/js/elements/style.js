jscss.add("image-ctrlr>.image-download", {
    position: "absolute",
    right: "-30px",
    top: "-30px",
    width: "30px",
    height: "30px",
    border_radius: "15px",
    border: ["2px", "solid", "var(--accent-1)"],
    background_color: "var(--foreground)",
    transition: '1s'
});

jscss.add("image-ctrlr>.image-download svg", {
    fill: "var(--accent-1)",
    transition: '.5s'
});

jscss.add("image-ctrlr>.image-download:hover svg", {
    fill: "var(--accent-2)"
});

jscss.add("image-ctrlr>.image-download:hover", {
    border_color: "var(--accent-2)"
})

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

    background_color: new Color(0,0,0,128),
    color: "var(--accent-1)",
    text_align: "center",
    font_size: "2em",

    width: "100%",
    height: "50px",

    transition: '1s'
});

jscss.add("image-ctrlr:hover::after", {
    bottom: 0,
})

jscss.add("section image-ctrlr", {
    display: "block",
    overflow: "hidden",
    position: "relative",
    background_size: "cover",
    background_position: "center",
    background_color : new Color(0, 0, 0),
    width: "500px",
    height: "500px",
    margin: "auto",
    border_radius: "20px",
    margin_bottom: "10px"
});

jscss.add("section image-ctrlr", {
    width: "100%",
    height: "500px",
    margin: "0",
    margin_bottom: "10px"
}, "screen and (max-width: 690px)");
