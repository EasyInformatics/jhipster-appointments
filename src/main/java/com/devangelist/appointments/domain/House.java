package com.devangelist.appointments.domain;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A House.
 */
@Entity
@Table(name = "house")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class House implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "number")
    private String number;

    @OneToMany(mappedBy = "house")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<User> users = new HashSet<>();

    @OneToMany(mappedBy = "house")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Appointment> appointments = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumber() {
        return number;
    }

    public House number(String number) {
        this.number = number;
        return this;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public Set<User> getUsers() {
        return users;
    }

    public House users(Set<User> users) {
        this.users = users;
        return this;
    }

    public House addUser(User user) {
        this.users.add(user);
        user.setHouse(this);
        return this;
    }

    public House removeUser(User user) {
        this.users.remove(user);
        user.setHouse(null);
        return this;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public Set<Appointment> getAppointments() {
        return appointments;
    }

    public House appointments(Set<Appointment> appointments) {
        this.appointments = appointments;
        return this;
    }

    public House addAppointment(Appointment appointment) {
        this.appointments.add(appointment);
        appointment.setHouse(this);
        return this;
    }

    public House removeAppointment(Appointment appointment) {
        this.appointments.remove(appointment);
        appointment.setHouse(null);
        return this;
    }

    public void setAppointments(Set<Appointment> appointments) {
        this.appointments = appointments;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof House)) {
            return false;
        }
        return id != null && id.equals(((House) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "House{" +
            "id=" + getId() +
            ", number='" + getNumber() + "'" +
            "}";
    }
}
