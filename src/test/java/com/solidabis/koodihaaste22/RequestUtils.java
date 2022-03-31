package com.solidabis.koodihaaste22;

import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;

import javax.servlet.http.Cookie;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

public class RequestUtils {
    public static final String VOTERID_COOKIE_NAME = "VOTERID";
    public static final String GET_LOUNASPAIKAT_ENDPOINT = "/lounaspaikat/Kempele";

    public static MockHttpServletRequestBuilder vote(String restaurantId, String voterId) {
        var cookie = new Cookie(VOTERID_COOKIE_NAME, voterId);
        return post(String.format("/aanestys/%s", restaurantId)).cookie(cookie);
    }

    public static MockHttpServletRequestBuilder loadRestaurants(String voterId) {
        var cookie = new Cookie(VOTERID_COOKIE_NAME, voterId);
        return get(GET_LOUNASPAIKAT_ENDPOINT).cookie(cookie);
    }
}