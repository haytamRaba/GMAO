# GMAO Frontend 

###  Pages 
-  Login - Email/password with validation
-  Dashboard - Statistics & recent activities
-  Equipments - Full CRUD with search/filter
-  Interventions - Maintenance tracking
-  Stock - Inventory with alerts

##  User Roles & Permissions

| Role | View | Create | Edit | Delete |
|------|------|--------|------|--------|
| Admin |  All | All |  All |  All |
| Ingénieur Biomédical | YES |  YES | YES |  YES |
| Chef de Service |  All |  Interventions | No | NO |
| Technicien |  All | No | Mark complete | No |



##  Data Flow

```
User Login
    ↓
AuthService.login()
    ↓
Store user in localStorage
    ↓
Set AuthContext
    ↓
Navigate to Dashboard
    ↓
Load data from services
    ↓
Display in components
```
##  How to Run

```bash
git clone https://github.com/haytamRaba/GMAO.git
cd Client
npm install
npm run dev
# Open http://localhost:5173
```
---
