# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

1) Add mapping for system generated identifier to agent custom identifier for a given facility in Database
    Add a table for maintaining the system generated identifier mapping to custom identifier provided for the given facility(Assuming an RDBMS with few million agent records, as join complexity is lower preference is to create separate table, leaving scope to add any custom identifiers in future)

    Acceptance Criteria:
      Able to upload custom identifiers for agents
      Fail for duplicate identifiers
      List existing mappings 

    Effort: Small

2) Add APIs to add/list custom identifiers of agents for a given facility
    If we provide the update operation for the custom ID’s, we will have the following problems.
      Old generated reports and the new generated reports will have the different custom identifiers. To eliminate this problem, we have to generate all the old reports again which is really impossible in the long term. So if we are okay with different custom identifiers in different reports we can go with update operation, but in the real world which is not acceptable for multiple reasons.

    With the above reason, we will not allow update of the custom key.

    Create API’s to create the custom key and only soft delete the key when the agent left. As we do soft delete, we will be able to generate the reports and use for audit even after the agent leaves
      
    Acceptance Criteria:
      We should be able to create the custom identifiers and store them.
      Should be able to throw errors when trying to use existing identifier or creating a new identifier for which we already have the mapping.
    Effort: Medium to large



    Fetch and populate custom identifiers in reports 
      On the current data, instead of system identifier fetch the corresponding custom identifier and populate that for the report data and generate, return the report

    Acceptance Criteria
      Custom identifier should be part of report
      There shouldn't be any system identifier for any record
    Effort: Small to Medium
