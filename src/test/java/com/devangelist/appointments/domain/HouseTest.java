package com.devangelist.appointments.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.devangelist.appointments.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

public class HouseTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(House.class);
        House house1 = new House();
        house1.setId(1L);
        House house2 = new House();
        house2.setId(house1.getId());
        assertThat(house1).isEqualTo(house2);
        house2.setId(2L);
        assertThat(house1).isNotEqualTo(house2);
        house1.setId(null);
        assertThat(house1).isNotEqualTo(house2);
    }
}
