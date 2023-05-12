<template>
    <div>
        <b-navbar type="dark" variant="dark">
          <b-navbar-nav>
            <b-nav-item to="/">Home</b-nav-item>

            <b-nav-item to="/quiz">Quiz</b-nav-item>
            
            <b-nav-item to="/blind-date">Quotes</b-nav-item>

            <b-nav-item-dropdown text="User" right>
              <b-dropdown-item to="/signin">Sign In</b-dropdown-item>
              <b-dropdown-item to="">My Reccomendations</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-navbar>
      </div>
</template>

<script>
import { BNavbar, BNavbarNav, BNavItem, BNavItemDropdown, BDropdownItem } from 'bootstrap-vue'

export default {
  name: 'NavBar',
  components: {
     BNavbar, 
     BNavbarNav, 
     BNavItem, 
     BNavItemDropdown, 
     BDropdownItem
  }
};
</script>
