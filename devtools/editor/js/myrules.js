var myrules = {
  tags: {
    a:      {
      set_attributes: {
        target: "_blank",
        rel:    "nofollow"
      },
      check_attributes: {
        "href":   "url", // important to avoid XSS
        "target": "_blank"
      }
    }
  }
};