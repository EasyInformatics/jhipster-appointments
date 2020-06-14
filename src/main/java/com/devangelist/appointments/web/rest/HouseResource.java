package com.devangelist.appointments.web.rest;

import com.devangelist.appointments.domain.House;
import com.devangelist.appointments.repository.HouseRepository;
import com.devangelist.appointments.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for managing {@link com.devangelist.appointments.domain.House}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class HouseResource {
    private final Logger log = LoggerFactory.getLogger(HouseResource.class);

    private static final String ENTITY_NAME = "house";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final HouseRepository houseRepository;

    public HouseResource(HouseRepository houseRepository) {
        this.houseRepository = houseRepository;
    }

    /**
     * {@code POST  /houses} : Create a new house.
     *
     * @param house the house to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new house, or with status {@code 400 (Bad Request)} if the house has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/houses")
    public ResponseEntity<House> createHouse(@RequestBody House house) throws URISyntaxException {
        log.debug("REST request to save House : {}", house);
        if (house.getId() != null) {
            throw new BadRequestAlertException("A new house cannot already have an ID", ENTITY_NAME, "idexists");
        }
        House result = houseRepository.save(house);
        return ResponseEntity
            .created(new URI("/api/houses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /houses} : Updates an existing house.
     *
     * @param house the house to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated house,
     * or with status {@code 400 (Bad Request)} if the house is not valid,
     * or with status {@code 500 (Internal Server Error)} if the house couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/houses")
    public ResponseEntity<House> updateHouse(@RequestBody House house) throws URISyntaxException {
        log.debug("REST request to update House : {}", house);
        if (house.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        House result = houseRepository.save(house);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, house.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /houses} : get all the houses.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of houses in body.
     */
    @GetMapping("/houses")
    public List<House> getAllHouses() {
        log.debug("REST request to get all Houses");
        return houseRepository.findAll();
    }

    /**
     * {@code GET  /houses/:id} : get the "id" house.
     *
     * @param id the id of the house to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the house, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/houses/{id}")
    public ResponseEntity<House> getHouse(@PathVariable Long id) {
        log.debug("REST request to get House : {}", id);
        Optional<House> house = houseRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(house);
    }

    /**
     * {@code DELETE  /houses/:id} : delete the "id" house.
     *
     * @param id the id of the house to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/houses/{id}")
    public ResponseEntity<Void> deleteHouse(@PathVariable Long id) {
        log.debug("REST request to delete House : {}", id);
        houseRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
