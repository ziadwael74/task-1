import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [FormsModule],
    template: `
    <div class="container">

      <h1>Team Manager</h1>

      <!-- Add Member Form -->
      <div class="form-box">

        <h2>Add New Member</h2>

        <input
          type="text"
          placeholder="Member Name"
          [(ngModel)]="newMember.name"
        >

        <input
          type="number"
          placeholder="Age"
          [(ngModel)]="newMember.age"
        >

        <select [(ngModel)]="newMember.department">
          <option value="">Select Department</option>

          @for (department of departments; track department) {
            <option [value]="department">
              {{ department }}
            </option>
          }
        </select>

        <label>
          <input
            type="checkbox"
            [(ngModel)]="newMember.available"
          >

          Available
        </label>

        <button (click)="addMember()">
          Add Member
        </button>

        @if (errorMessage) {
          <p class="error">{{ errorMessage }}</p>
        }

      </div>


      <!-- Filters -->
      <div class="controls">

        <div>
          <label>Department:</label>

          <select [(ngModel)]="selectedDepartment">
            <option value="All">All Departments</option>

            @for (department of departments; track department) {
              <option [value]="department">
                {{ department }}
              </option>
            }
          </select>
        </div>


        <div>
          <label>View:</label>

          <button
            (click)="viewMode = 'card'"
            [class.active]="viewMode === 'card'"
          >
            Card View
          </button>

          <button
            (click)="viewMode = 'list'"
            [class.active]="viewMode === 'list'"
          >
            List View
          </button>
        </div>

      </div>


      <!-- Members -->
      @if (filteredMembers.length === 0) {

        <div class="empty">
          <h2>No members found</h2>
          <p>There are no members matching this filter.</p>
        </div>

      } @else {

        @switch (viewMode) {

          <!-- Card View -->
          @case ('card') {

            <div class="cards">

              @for (member of filteredMembers; track member.name) {

                <div class="card">

                  <h2>{{ member.name }}</h2>

                  <p>
                    <strong>Age:</strong>
                    {{ member.age }}
                  </p>

                  <p>
                    <strong>Department:</strong>
                    {{ member.department }}
                  </p>

                  @if (member.available) {

                    <p class="available">
                      Status: Available
                    </p>

                  } @else {

                    <p class="unavailable">
                      Status: Unavailable
                    </p>

                  }

                  <button (click)="toggleAvailability(member)">
                    Toggle Availability
                  </button>

                </div>

              }

            </div>

          }


          <!-- List View -->
          @case ('list') {

            <div class="list">

              @for (member of filteredMembers; track member.name) {

                <div class="list-item">

                  <span>
                    {{ member.name }}
                    -
                    {{ member.department }}
                    -
                  </span>

                  @if (member.available) {

                    <span class="available">
                      ✔️ Available
                    </span>

                  } @else {

                    <span class="unavailable">
                      ❌ Unavailable
                    </span>

                  }

                  <button (click)="toggleAvailability(member)">
                    Toggle
                  </button>

                </div>

              }

            </div>

          }

        }

      }

    </div>
  `,

    styles: [`

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      font-family: Arial, sans-serif;
    }

    .container {
      width: 90%;
      max-width: 1000px;
      margin: 30px auto;
    }

    h1 {
      text-align: center;
      margin-bottom: 30px;
    }

    .form-box {
      background: #f4f4f4;
      padding: 20px;
      border-radius: 10px;
      margin-bottom: 25px;
    }

    .form-box h2 {
      margin-top: 0;
    }

    input,
    select {
      padding: 10px;
      margin: 5px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }

    button {
      padding: 10px 15px;
      margin: 5px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      background: #333;
      color: white;
    }

    button:hover {
      background: #555;
    }

    button.active {
      background: #007bff;
    }

    .controls {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .cards {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }

    .card {
      border: 1px solid #ddd;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    .card h2 {
      margin-top: 0;
    }

    .available {
      color: green;
      font-weight: bold;
    }

    .unavailable {
      color: red;
      font-weight: bold;
    }

    .list {
      border: 1px solid #ddd;
      border-radius: 10px;
      overflow: hidden;
    }

    .list-item {
      padding: 15px;
      border-bottom: 1px solid #ddd;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .list-item:last-child {
      border-bottom: none;
    }

    .empty {
      text-align: center;
      padding: 40px;
      background: #f5f5f5;
      border-radius: 10px;
    }

    .error {
      color: red;
      font-weight: bold;
    }

    @media (max-width: 700px) {

      .cards {
        grid-template-columns: 1fr;
      }

      .controls {
        flex-direction: column;
        align-items: flex-start;
      }

    }

  `]
})
export class AppComponent {

    // Team members
    members = [{
            name: 'Ahmed',
            age: 28,
            department: 'Development',
            available: true
        },
        {
            name: 'Esraa',
            age: 24,
            department: 'Marketing',
            available: false
        },
        {
            name: 'Omar',
            age: 26,
            department: 'Design',
            available: true
        }
    ];


    // Departments
    departments = [
        'Development',
        'Marketing',
        'Design'
    ];


    // Selected department
    selectedDepartment = 'All';


    // Current view
    viewMode = 'card';


    // Error message
    errorMessage = '';


    // Form data
    newMember = {
        name: '',
        age: null as number | null,
        department: '',
        available: false
    };


    // Filter members
    get filteredMembers() {

        if (this.selectedDepartment === 'All') {
            return this.members;
        }

        return this.members.filter(function(member) {
            return member.department === this.selectedDepartment;
        }, this);

    }


    // Add member
    addMember() {

        this.errorMessage = '';


        // Validation
        if (
            this.newMember.name === '' ||
            this.newMember.age === null ||
            this.newMember.department === ''
        ) {

            this.errorMessage = 'Please fill all fields';

            return;
        }


        // Add member
        this.members.push({
            name: this.newMember.name,
            age: this.newMember.age,
            department: this.newMember.department,
            available: this.newMember.available
        });


        // Clear form
        this.newMember = {
            name: '',
            age: null,
            department: '',
            available: false
        };

    }


    // Toggle availability
    toggleAvailability(member: any) {

        member.available = !member.available;

    }

}