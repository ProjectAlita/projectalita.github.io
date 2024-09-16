# Alita Release Notes

## Introduction

**Alita** is an innovative web application that revolutionizes how you interact with prompts. Designed as a dynamic workspace, it empowers users to create, organize, and collaborate on prompts like never before.

## Information

* **Release Version**: 1.0.1
* **Released on**: 27-May-2024
* **Access**: [Alita Platform](https://alita.lab.epam.com). **Note**: You need to enable Epam VPN to access Alita.
* **User Guide**: [Alita - User Guide](../user-guide/intro.md) 

## New Features

* **IDE Extensions**: Added support for Alita Code and Alita Code Chat extensions for both Visual Studio Code and IntelliJ IDEA, enhancing coding efficiency directly from your favorite development environments.
* **QTest Integration**: Introduced QTest as a new source type under Datasource→Dataset, allowing for seamless integration and management of testing data.
* **Project Switcher**: Implemented a new tool for swiftly navigating between different projects, improving workflow fluidity.
* **Enhanced Search Functionality**: Improved search capabilities, enabling more precise and faster retrieval of information across the platform.
* **Dataset Status Indicators**: Enhanced user interface for dataset status:
    * **Done**: No indicator displayed.
    * **Preparing/In Progress**: Displays a circular progress indicator using the material default component.
    * **Error**: Shows a warning icon alongside a closeable warning alert to inform users of issues that need attention.

## Known Issues

* **Database Corruption During Indexing**: If a user searches in one dataset while another is indexing, there is a risk of database corruption, leading to irreproducible bugs. **Workaround**: It is recommended to create a new datasource and reindex the data within it.
* **Delayed File Finder in Alita HUB**: Users may experience delays when opening the file finder in Alita HUB.
* **Prompt Saving Error**: There is an issue where prompts cannot be saved if the **Name** field is filled using a copy/paste action that includes leading spaces.

## Fixed Issues

* **GUI Freezing During Indexing**: Resolved an issue where the frontend would freeze when indexing large files in a dataset.
* **Token Expiry Display**: Fixed a bug where expired tokens were not marked as **Expired** in the Configuration tab.
* **Modal Design Issue**: Corrected the stretched and improperly displayed design of the **Add to collections** modal, ensuring it now renders correctly.


